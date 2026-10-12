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
};
