export type Env = {
  DB: D1Database;
  ENVIRONMENT: "development" | "production";
  /** Comma-separated origins allowed to call the public API, e.g. https://infinitytattoo.no */
  ALLOWED_ORIGINS: string;
  /** Cloudflare Access team domain, e.g. infinity.cloudflareaccess.com */
  ACCESS_TEAM_DOMAIN?: string;
  /** Cloudflare Access application audience tag. */
  ACCESS_AUD?: string;
  /** Local development only: act as this staff email without Access. */
  DEV_STAFF_EMAIL?: string;
  /** Optional Turnstile secret; when set, the booking form must pass a Turnstile check. */
  TURNSTILE_SECRET?: string;
  /** Optional Email Routing binding to notify the studio about new requests. */
  NOTIFY?: SendEmail;
  NOTIFY_FROM?: string;
  NOTIFY_TO?: string;
  /** Public URL of this worker, used in links sent to clients (consent form, payments). */
  PUBLIC_BASE_URL: string;
  /** The website, used for "back to site" links and payment return pages. */
  SITE_URL: string;
  /** Client emails (confirmations, reminders, aftercare). Resend free tier; skipped when unset. */
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  EMAIL_REPLY_TO?: string;
  /** SMS reminders through 46elks (0.70 SEK per SMS to Norway, prepaid, no monthly fee); skipped when unset. */
  ELKS_API_USER?: string;
  ELKS_API_PASSWORD?: string;
  /** Sender name shown on the phone, max 11 letters A–Z/0–9. Defaults to "Infinity". */
  SMS_FROM?: string;
  /** Online deposits and gift cards through Stripe Checkout; disabled when unset. */
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  /** Optional R2 bucket for reference photos uploaded with booking requests. */
  PHOTOS?: R2Bucket;
  /** Zettle Purchase API (read-only) to import till payments automatically. */
  ZETTLE_CLIENT_ID?: string;
  ZETTLE_API_KEY?: string;
  /** Optional: Fiken personal API token as a secret, instead of saving it under Innstillinger. */
  FIKEN_API_TOKEN?: string;
  /** Printed on the personalliste. */
  ORG_NAME?: string;
  ORG_NUMBER?: string;
};
