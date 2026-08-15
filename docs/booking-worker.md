# Booking worker

The website now has one booking request form. The form stores the request in Firestore, writes a backup row to Google Sheets, and queues a deterministic browser job. The worker runs the visible Linework booking flow in Cloud Run.

## Required services

- Google Cloud project with Firestore, Cloud Storage, Cloud Tasks, and Cloud Run enabled.
- Private Cloud Storage bucket with CORS allowing `PUT` from the website origins.
- A Google Sheet with a `Bookings` tab, shared with the service account.
- Resend sender domain and API key.
- A Cloud Tasks queue in the chosen region.

## Vercel variables

Set these on the Vercel-only preview/branch environment, never on the official-domain deployment:

```text
GOOGLE_CLOUD_PROJECT
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64
GOOGLE_STORAGE_BUCKET
GOOGLE_SHEET_ID
GOOGLE_SHEET_NAME=Bookings
CLOUD_TASKS_QUEUE
CLOUD_TASKS_LOCATION
CLOUD_TASKS_SERVICE_ACCOUNT
BOOKING_WORKER_URL
BOOKING_WORKER_SHARED_SECRET
```

## Worker variables

Set these on Cloud Run:

```text
GOOGLE_CLOUD_PROJECT
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64
GOOGLE_STORAGE_BUCKET
BOOKING_WORKER_SHARED_SECRET
LINEWORK_BOOKING_URL=https://booking.linework.com/infinity
RESEND_API_KEY
BOOKING_EMAIL_FROM
BOOKING_ALERT_EMAIL=infinitytattoo99@gmail.com
DRY_RUN=true
```

Keep `DRY_RUN=true` until a controlled test request reaches the final confirmation step without submitting. Set it to `false` only for the approved live worker.

## Deploy the worker

```bash
gcloud builds submit worker --tag REGION-docker.pkg.dev/PROJECT/infinity-tattoo/linework-worker:latest
gcloud run deploy infinity-tattoo-linework-worker \
  --image REGION-docker.pkg.dev/PROJECT/infinity-tattoo/linework-worker:latest \
  --region REGION \
  --no-allow-unauthenticated
```

Grant the Cloud Tasks service account permission to invoke the Cloud Run service. Point `BOOKING_WORKER_URL` at the authenticated Cloud Run URL.

## Safety behavior

- A repeated task does not submit a request twice after confirmation or an ambiguous final step.
- A missing time, changed Linework UI, or CAPTCHA/challenge becomes `manual_review`.
- Temporary worker failures return HTTP 500 so Cloud Tasks can retry.
- The worker never attempts to bypass a CAPTCHA or other challenge.
- Logs contain request IDs and generic error states, not customer form content or provider responses.
