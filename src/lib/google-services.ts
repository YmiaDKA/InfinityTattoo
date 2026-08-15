import { CloudTasksClient } from "@google-cloud/tasks";
import { Firestore } from "@google-cloud/firestore";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  project_id?: string;
};

export class BookingConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookingConfigurationError";
  }
}

function getServiceAccount(): ServiceAccount {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? (encoded
    ? Buffer.from(encoded, "base64").toString("utf8")
    : undefined);

  if (!raw) {
    throw new BookingConfigurationError(
      "GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is not configured."
    );
  }

  try {
    const account = JSON.parse(raw) as Partial<ServiceAccount>;

    if (!account.client_email || !account.private_key) {
      throw new Error("client_email or private_key is missing");
    }

    return {
      client_email: account.client_email,
      private_key: account.private_key.replace(/\\n/g, "\n"),
      project_id: account.project_id,
    };
  } catch {
    throw new BookingConfigurationError(
      "The Google service account JSON could not be parsed."
    );
  }
}

function getProjectId(account: ServiceAccount) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT ?? account.project_id;

  if (!projectId) {
    throw new BookingConfigurationError("GOOGLE_CLOUD_PROJECT is not configured.");
  }

  return projectId;
}

function getCredentials(account: ServiceAccount) {
  return {
    client_email: account.client_email,
    private_key: account.private_key,
  };
}

export function getFirestoreClient() {
  const account = getServiceAccount();

  return new Firestore({
    projectId: getProjectId(account),
    credentials: getCredentials(account),
  });
}

export function getStorageClient() {
  const account = getServiceAccount();

  return new Storage({
    projectId: getProjectId(account),
    credentials: getCredentials(account),
  });
}

export function getCloudTasksClient() {
  const account = getServiceAccount();

  return new CloudTasksClient({
    projectId: getProjectId(account),
    credentials: getCredentials(account),
  });
}

export function getGoogleSheetsClient() {
  const account = getServiceAccount();
  const auth = new google.auth.JWT({
    email: account.client_email,
    key: account.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ auth, version: "v4" });
}

export function getGoogleProjectId() {
  const account = getServiceAccount();
  return getProjectId(account);
}
