import { Firestore } from "@google-cloud/firestore";
import { Storage } from "@google-cloud/storage";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  project_id?: string;
};

function getServiceAccount(): ServiceAccount {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? (encoded
    ? Buffer.from(encoded, "base64").toString("utf8")
    : undefined);

  if (!raw) {
    throw new Error("Google service account is not configured.");
  }

  const account = JSON.parse(raw) as Partial<ServiceAccount>;
  if (!account.client_email || !account.private_key) {
    throw new Error("Google service account credentials are incomplete.");
  }

  return {
    client_email: account.client_email,
    private_key: account.private_key.replace(/\\n/g, "\n"),
    project_id: account.project_id,
  };
}

function getProjectId(account: ServiceAccount) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT ?? account.project_id;
  if (!projectId) {
    throw new Error("GOOGLE_CLOUD_PROJECT is not configured.");
  }

  return projectId;
}

export function getFirestore() {
  const account = getServiceAccount();
  return new Firestore({
    projectId: getProjectId(account),
    credentials: {
      client_email: account.client_email,
      private_key: account.private_key,
    },
  });
}

export function getStorage() {
  const account = getServiceAccount();
  return new Storage({
    projectId: getProjectId(account),
    credentials: {
      client_email: account.client_email,
      private_key: account.private_key,
    },
  });
}
