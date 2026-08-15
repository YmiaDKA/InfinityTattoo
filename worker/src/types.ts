export type BookingStatus =
  | "received"
  | "queued"
  | "checking_availability"
  | "submitting"
  | "confirmed"
  | "no_matching_time"
  | "manual_review"
  | "sheet_sync_pending"
  | "failed";

export type BookingReferenceImage = {
  objectName: string;
  fileName: string;
  contentType: string;
};

export type BookingRecord = {
  requestId: string;
  service: "consultation" | "tattoo" | "tooth-gems";
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  fullName: string;
  email: string;
  phone: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  timing: string;
  budget: string;
  note: string;
  locale: "NO" | "EN";
  referenceImages: BookingReferenceImage[];
  status: BookingStatus;
  createdAt: string;
  sheetStatus: "pending" | "synced" | "not_configured";
  updatedAt: string;
};

export type WorkerTask = {
  requestId: string;
};
