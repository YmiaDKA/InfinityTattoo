import { BookingRequest, BookingStatus } from "@/lib/booking-schema";
import {
  getCloudTasksClient,
  getFirestoreClient,
  getGoogleProjectId,
  getGoogleSheetsClient,
  getStorageClient,
} from "@/lib/google-services";

const bookingCollection = "bookingRequests";

export type BookingRecord = BookingRequest & {
  createdAt: string;
  status: BookingStatus;
  sheetStatus: "pending" | "synced" | "not_configured";
  queuedAt?: string;
  updatedAt: string;
  workerError?: string;
};

function now() {
  return new Date().toISOString();
}

export async function createBookingRecord(request: BookingRequest) {
  const firestore = getFirestoreClient();
  const reference = firestore.collection(bookingCollection).doc(request.requestId);
  const existing = await reference.get();

  if (existing.exists) {
    return {
      created: false,
      record: existing.data() as BookingRecord,
    };
  }

  const timestamp = now();
  const record: BookingRecord = {
    ...request,
    createdAt: timestamp,
    status: "received",
    sheetStatus: process.env.GOOGLE_SHEET_ID ? "pending" : "not_configured",
    updatedAt: timestamp,
  };

  try {
    await reference.create(record);
  } catch (error) {
    if ((error as { code?: number }).code === 6) {
      const concurrent = await reference.get();
      if (concurrent.exists) {
        return {
          created: false,
          record: concurrent.data() as BookingRecord,
        };
      }
    }

    throw error;
  }

  return { created: true, record };
}

export async function updateBookingRecord(
  requestId: string,
  update: Partial<BookingRecord>
) {
  const firestore = getFirestoreClient();

  await firestore
    .collection(bookingCollection)
    .doc(requestId)
    .update({ ...update, updatedAt: now() });
}

export async function getBookingRecord(requestId: string) {
  const firestore = getFirestoreClient();
  const snapshot = await firestore.collection(bookingCollection).doc(requestId).get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as BookingRecord;
}

export async function appendBookingBackup(record: BookingRecord) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    return false;
  }

  const sheets = getGoogleSheetsClient();
  const sheetName = process.env.GOOGLE_SHEET_NAME ?? "Bookings";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:U`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          record.requestId,
          record.createdAt,
          record.status,
          record.locale,
          record.service,
          record.dateStart,
          record.dateEnd,
          record.timeStart,
          record.timeEnd,
          record.fullName,
          record.email,
          record.phone,
          record.placement,
          record.size,
          record.style,
          record.timing,
          record.budget,
          record.referenceImages.length,
          record.idea,
          record.note,
          record.consent,
        ],
      ],
    },
  });

  return true;
}

export async function enqueueBooking(requestId: string) {
  const workerUrl = process.env.BOOKING_WORKER_URL;
  const queue = process.env.CLOUD_TASKS_QUEUE;
  const location = process.env.CLOUD_TASKS_LOCATION;
  const serviceAccountEmail = process.env.CLOUD_TASKS_SERVICE_ACCOUNT;
  const sharedSecret = process.env.BOOKING_WORKER_SHARED_SECRET;

  if (!workerUrl || !queue || !location || !serviceAccountEmail) {
    return false;
  }

  const projectId = getGoogleProjectId();
  const tasks = getCloudTasksClient();
  const parent = tasks.queuePath(projectId, location, queue);
  const body = Buffer.from(JSON.stringify({ requestId })).toString("base64");

  try {
    await tasks.createTask({
      parent,
      task: {
        name: tasks.taskPath(projectId, location, queue, requestId),
        httpRequest: {
          httpMethod: "POST",
          url: `${workerUrl.replace(/\/$/, "")}/tasks/linework`,
          headers: {
            "Content-Type": "application/json",
            ...(sharedSecret ? { "X-Booking-Worker-Secret": sharedSecret } : {}),
          },
          body,
          oidcToken: {
            serviceAccountEmail,
            audience: workerUrl,
          },
        },
      },
    });
  } catch (error) {
    if ((error as { code?: number }).code !== 6) {
      throw error;
    }
  }

  return true;
}

export async function createReferenceUpload(
  requestId: string,
  fileName: string,
  contentType: string
) {
  const bucketName = process.env.GOOGLE_STORAGE_BUCKET;

  if (!bucketName) {
    throw new Error("GOOGLE_STORAGE_BUCKET is not configured.");
  }

  const safeFileName = fileName
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(-96) || "reference-image";
  const objectName = `booking-uploads/${requestId}/${crypto.randomUUID()}-${safeFileName}`;
  const file = getStorageClient().bucket(bucketName).file(objectName);
  const [uploadUrl] = await file.getSignedUrl({
    action: "write",
    contentType,
    expires: Date.now() + 15 * 60 * 1000,
    version: "v4",
  });

  return { objectName, uploadUrl };
}
