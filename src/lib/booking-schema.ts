import { z } from "zod";

const isoDate = z.string().refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return date.toISOString().slice(0, 10) === value;
}, "Use a valid date in YYYY-MM-DD format.");

const isoTime = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM time.");

export const referenceImageSchema = z.object({
  objectName: z.string().regex(/^booking-uploads\/[a-zA-Z0-9_-]+\/.+$/),
  fileName: z.string().trim().min(1).max(160),
  contentType: z.string().regex(/^image\/[a-zA-Z0-9.+-]+$/),
});

export const bookingRequestSchema = z
  .object({
    requestId: z.string().uuid(),
    service: z.enum(["consultation", "tattoo", "tooth-gems"]),
    dateStart: isoDate,
    dateEnd: isoDate,
    timeStart: isoTime.optional().default(""),
    timeEnd: isoTime.optional().default(""),
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(160),
    phone: z.string().trim().min(5).max(40),
    idea: z.string().trim().min(2).max(4000),
    placement: z.string().trim().max(160).optional().default(""),
    size: z.string().trim().max(160).optional().default(""),
    style: z.string().trim().max(160).optional().default(""),
    timing: z.string().trim().max(160).optional().default(""),
    budget: z.string().trim().max(160).optional().default(""),
    note: z.string().trim().max(3000).optional().default(""),
    locale: z.enum(["NO", "EN"]),
    consent: z.literal(true),
    website: z.string().max(0).optional().default(""),
    referenceImages: z.array(referenceImageSchema).max(5).default([]),
  })
  .superRefine((value, context) => {
    if (value.dateStart > value.dateEnd) {
      context.addIssue({
        code: "custom",
        path: ["dateEnd"],
        message: "The end date must be on or after the start date.",
      });
    }

    if (value.timeStart && value.timeEnd && value.timeStart >= value.timeEnd) {
      context.addIssue({
        code: "custom",
        path: ["timeEnd"],
        message: "The end time must be after the start time.",
      });
    }

    const start = new Date(`${value.dateStart}T00:00:00.000Z`).getTime();
    const end = new Date(`${value.dateEnd}T00:00:00.000Z`).getTime();
    const maxWindow = 180 * 24 * 60 * 60 * 1000;

    if (end - start > maxWindow) {
      context.addIssue({
        code: "custom",
        path: ["dateEnd"],
        message: "Choose a date window within six months.",
      });
    }
  });

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

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

export type BookingReferenceImage = z.infer<typeof referenceImageSchema>;
