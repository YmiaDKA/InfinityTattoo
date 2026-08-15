import { NextResponse } from "next/server";

import { bookingRequestSchema } from "@/lib/booking-schema";
import {
  appendBookingBackup,
  alertStudioBooking,
  createBookingRecord,
  enqueueBooking,
  updateBookingRecord,
} from "@/lib/booking-server";
import { BookingConfigurationError } from "@/lib/google-services";

export const runtime = "nodejs";
export const maxDuration = 30;

function responseMessage(locale: "NO" | "EN") {
  return locale === "NO"
    ? "Forespørselen er mottatt. Studioet følger opp og bekrefter tidspunktet."
    : "Your request was received. The studio will follow up and confirm the time.";
}

export async function POST(request: Request) {
  let input: ReturnType<typeof bookingRequestSchema.parse>;

  try {
    input = bookingRequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Please check the booking form and try again." },
      { status: 400 }
    );
  }

  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey || idempotencyKey !== input.requestId) {
    return NextResponse.json(
      { error: "The booking request could not be verified." },
      { status: 400 }
    );
  }

  if (
    input.referenceImages.some(
      (image) => !image.objectName.startsWith(`booking-uploads/${input.requestId}/`)
    )
  ) {
    return NextResponse.json(
      { error: "One or more reference images are invalid." },
      { status: 400 }
    );
  }

  try {
    const { created, record } = await createBookingRecord(input);

    if (
      !created &&
      !["received", "sheet_sync_pending"].includes(record.status)
    ) {
      return NextResponse.json({
        requestId: record.requestId,
        status: record.status,
        message: responseMessage(record.locale),
      });
    }

    let sheetSynced = record.sheetStatus === "synced";

    if (!sheetSynced && record.sheetStatus === "pending") {
      try {
        sheetSynced = await appendBookingBackup(record);
        if (sheetSynced) {
          await updateBookingRecord(record.requestId, { sheetStatus: "synced" });
        }
      } catch {
        sheetSynced = false;
      }
    }

    if (!sheetSynced) {
      await updateBookingRecord(record.requestId, {
        status: "sheet_sync_pending",
        workerError: "The Google Sheets backup is not available yet.",
      });
      await alertStudioBooking(
        record,
        "The Google Sheets backup is not available yet. The request is stored in Firestore and needs manual review."
      ).catch(() => undefined);
      return NextResponse.json(
        {
          requestId: record.requestId,
          status: "sheet_sync_pending",
          message: responseMessage(record.locale),
        },
        { status: 202 }
      );
    }

    let queued = false;
    try {
      queued = await enqueueBooking(record.requestId);
    } catch {
      await updateBookingRecord(record.requestId, {
        status: "manual_review",
        workerError: "The booking worker could not be queued.",
      });
    }

    if (queued) {
      await updateBookingRecord(record.requestId, {
        queuedAt: new Date().toISOString(),
        status: "queued",
      });
    } else {
      await updateBookingRecord(record.requestId, {
        status: "manual_review",
        workerError: "The booking worker is not configured or could not be queued.",
      });
      await alertStudioBooking(
        record,
        "The booking worker is not configured or could not be queued. The request is stored in Firestore and needs manual review."
      ).catch(() => undefined);
    }

    return NextResponse.json(
      {
        requestId: record.requestId,
        status: queued ? "queued" : "manual_review",
        message: responseMessage(record.locale),
      },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof BookingConfigurationError) {
      return NextResponse.json(
        { error: "The booking service is not configured yet." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "The request could not be stored. Please try again." },
      { status: 503 }
    );
  }
}
