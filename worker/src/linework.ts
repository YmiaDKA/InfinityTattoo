import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { chromium, type Page } from "playwright";
import { Resend } from "resend";

import { getFirestore, getStorage } from "./google.js";
import type { BookingRecord } from "./types.js";

const bookingUrl = process.env.LINEWORK_BOOKING_URL ?? "https://booking.linework.com/infinity";
const bookingCollection = "bookingRequests";
const studioEmail = process.env.BOOKING_ALERT_EMAIL ?? "infinitytattoo99@gmail.com";

export class ManualReviewError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManualReviewError";
  }
}

export class NoMatchingTimeError extends ManualReviewError {
  constructor(message: string) {
    super(message);
    this.name = "NoMatchingTimeError";
  }
}

function localized(record: BookingRecord, english: string, norwegian: string) {
  return record.locale === "NO" ? norwegian : english;
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/Oslo",
  }).format(new Date(`${value}T12:00:00+01:00`));
}

async function updateRecord(requestId: string, update: Record<string, unknown>) {
  await getFirestore()
    .collection(bookingCollection)
    .doc(requestId)
    .update({ ...update, updatedAt: new Date().toISOString() });
}

async function getRecord(requestId: string) {
  const snapshot = await getFirestore().collection(bookingCollection).doc(requestId).get();
  return snapshot.exists ? (snapshot.data() as BookingRecord) : null;
}

async function clickFirstVisibleText(page: Page, labels: RegExp[]) {
  for (const label of labels) {
    const candidate = page.getByText(label).first();
    if ((await candidate.count()) > 0 && (await candidate.isVisible())) {
      await candidate.click();
      return;
    }
  }

  throw new Error("Expected Linework control was not found.");
}

async function clickNext(page: Page) {
  const next = page.getByRole("button", { name: /Neste|Next/i }).last();
  await next.waitFor({ state: "visible", timeout: 15_000 });
  await next.click();
}

async function selectService(page: Page, record: BookingRecord) {
  if (record.service === "tattoo") {
    await clickFirstVisibleText(page, [/^Forespør avtale$/i, /^Request an appointment$/i]);
    await clickFirstVisibleText(page, [/^Start$/i]);
    await clickFirstVisibleText(page, [
      /^Jeg er usikker på hvilken artist/i,
      /^I am unsure which artist/i,
    ]);
    await clickNext(page);
    return;
  }

  const labels = record.service === "tooth-gems"
    ? [/^Tannsmykke$/i, /^Tooth gems$/i]
    : [/^Konsultasjon$/i, /^Consultation$/i];
  let serviceHeading: ReturnType<Page["getByText"]> | undefined;

  for (const label of labels) {
    const candidate = page.getByText(label).first();
    if ((await candidate.count()) > 0 && (await candidate.isVisible())) {
      serviceHeading = candidate;
      break;
    }
  }

  if (!serviceHeading) {
    throw new Error("The requested Linework service was not found.");
  }

  const serviceCard = serviceHeading.locator("xpath=ancestor::div[.//button][1]");
  const add = serviceCard.getByRole("button", { name: /Legg til|Add/i }).first();
  await add.waitFor({ state: "visible", timeout: 10_000 });
  await add.click();
}

async function availableTimeSlots(page: Page) {
  const text = await page.locator("span").allTextContents();
  return text
    .map((value) => value.trim())
    .filter((value) => /^\d{1,2}:\d{2}$/.test(value));
}

async function selectDateAndTime(page: Page, record: BookingRecord) {
  const wantedStart = new Date(`${record.dateStart}T00:00:00.000Z`).getTime();
  const wantedEnd = new Date(`${record.dateEnd}T23:59:59.999Z`).getTime();
  const earliest = toMinutes(record.timeStart);
  const latest = toMinutes(record.timeEnd) - 30;

  for (let month = 0; month < 8; month += 1) {
    const cells = page.locator('[role="gridcell"][aria-label]');
    const candidates = await cells.evaluateAll((elements) => elements.map((element) => ({
      disabled: element.getAttribute("aria-disabled") === "true",
      label: element.getAttribute("aria-label") ?? "",
    })));

    for (const candidate of candidates) {
      const candidateDate = Date.parse(candidate.label);
      if (
        candidate.disabled ||
        Number.isNaN(candidateDate) ||
        candidateDate < wantedStart ||
        candidateDate > wantedEnd
      ) {
        continue;
      }

      const selectorLabel = candidate.label.replace(/(["\\])/g, "\\$1");
      await page.locator(`[role="gridcell"][aria-label="${selectorLabel}"]`).click();
      await page.waitForTimeout(350);

      const slot = (await availableTimeSlots(page))
        .map((value) => ({ minutes: toMinutes(value), value }))
        .filter(({ minutes }) => minutes >= earliest && minutes <= latest)
        .sort((left, right) => left.minutes - right.minutes)[0];

      if (slot) {
        await page.getByText(slot.value, { exact: true }).first().click();
        return;
      }
    }

    const nextMonth = page.locator('[data-testid="nextMonth"]');
    if ((await nextMonth.count()) === 0 || !(await nextMonth.isVisible())) {
      break;
    }

    await nextMonth.click();
    await page.waitForTimeout(500);
  }

  throw new NoMatchingTimeError("No matching Linework time was available.");
}

async function downloadReferences(record: BookingRecord, directory: string) {
  const bucketName = process.env.GOOGLE_STORAGE_BUCKET;
  if (!bucketName || record.referenceImages.length === 0) {
    return [];
  }

  const bucket = getStorage().bucket(bucketName);
  const paths: string[] = [];

  for (const [index, image] of record.referenceImages.entries()) {
    const destination = join(directory, `${index}-${image.fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`);
    await bucket.file(image.objectName).download({ destination });
    paths.push(destination);
  }

  return paths;
}

function composeArtistNote(record: BookingRecord) {
  return [
    `Idea: ${record.idea}`,
    `Placement: ${record.placement}`,
    record.size ? `Approximate size: ${record.size}` : "",
    record.style ? `Style: ${record.style}` : "",
    record.timing ? `Timing: ${record.timing}` : "",
    record.budget ? `Budget: ${record.budget}` : "",
    record.note ? `Note: ${record.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function checkForChallenge(page: Page) {
  const challenge = page.locator(
    'iframe[src*="recaptcha"], iframe[src*="hcaptcha"], [class*="captcha"], [id*="captcha"]'
  );

  const visible = await challenge.evaluateAll((elements) =>
    elements.some((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    })
  );

  if (visible) {
    throw new ManualReviewError("A booking challenge appeared before confirmation.");
  }
}

async function sendEmail(record: BookingRecord, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_EMAIL_FROM;

  if (!apiKey || !from) {
    console.error("booking_email_not_configured", { requestId: record.requestId });
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: [record.email],
    subject,
    html,
  });
}

async function alertStudio(record: BookingRecord, reason: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_EMAIL_FROM;
  if (!apiKey || !from) {
    return;
  }

  const resend = new Resend(apiKey);
  const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  await resend.emails.send({
    from,
    to: [studioEmail],
    subject: `Booking needs follow-up: ${record.fullName}`,
    html: `<p>Booking request <strong>${escapeHtml(record.requestId)}</strong> needs manual follow-up.</p><p>${escapeHtml(reason)}</p><p>${escapeHtml(record.fullName)}<br>${escapeHtml(record.email)}<br>${escapeHtml(record.phone)}</p>`,
  });
}

async function fillCustomerDetails(page: Page, record: BookingRecord, referencePaths: string[]) {
  if (referencePaths.length > 0) {
    await page.locator('input[name="reference-images-file-upload"]').setInputFiles(referencePaths);
  }

  const note = page.locator("textarea").first();
  await note.fill(composeArtistNote(record));
  await page.locator('input[name="fullName"]').fill(record.fullName);
  await page.locator('input[name="email"]').fill(record.email);
  await page.locator('input[name="phone"]').fill(record.phone);
  await page.locator('input[name="agree-to-terms-and-conditions-checkbox"]').check();
}

async function submitTattooRequest(
  page: Page,
  record: BookingRecord,
  referencePaths: string[]
) {
  await clickFirstVisibleText(page, [/^Medium$/i]);
  await clickFirstVisibleText(page, [/^Svart\/Gråtoner$/i, /^Black\/grey$/i]);
  await clickFirstVisibleText(page, [/^Nei.*cover-up/i, /^No.*cover-up/i]);
  await page.locator('input[name="body-location-input"]').fill(record.placement);
  await page.locator('textarea[name="tattoo-description-textarea"]').fill(record.idea);

  if (referencePaths.length > 0) {
    await page.locator('input[name="reference-images-file-upload"]').setInputFiles(referencePaths);
  }

  await page
    .locator('textarea[name="availability-additional-details-textarea"]')
    .fill(
      [
        `Preferred date window: ${record.dateStart} to ${record.dateEnd}`,
        `Preferred time window: ${record.timeStart} to ${record.timeEnd}`,
        record.note,
      ]
        .filter(Boolean)
        .join("\n")
    );
  await page.getByRole("button", { name: /Neste: Foreslå avtaletidspunkt|Next/i }).click();
  await page.getByText(/Send inn forespørselen din|Submit your request/i).waitFor({
    state: "visible",
    timeout: 30_000,
  });
  await page.locator('input[name="fullName"]').fill(record.fullName);
  await page.locator('input[name="email"]').fill(record.email);
  await page.locator('input[name="phoneNumber"]').fill(record.phone);
  await page.locator('input[name="is-over-18-checkbox"]').check();
  await page.locator('input[name="agree-to-terms-and-conditions-checkbox"]').check();
  await checkForChallenge(page);
}

async function sendBookingOutcomeEmail(record: BookingRecord, confirmed: boolean) {
  await sendEmail(
    record,
    confirmed
      ? localized(record, "Infinity Tattoo booking request received", "Infinity Tattoo bookingforespørsel mottatt")
      : localized(record, "Infinity Tattoo request received, not booked", "Infinity Tattoo forespørsel mottatt, ikke booket"),
    `<p>${confirmed
      ? localized(record, "Your request was submitted to the booking calendar.", "Forespørselen din ble sendt til bookingkalenderen.")
      : localized(record, "We received your request, but no time was booked. The studio will follow up directly.", "Vi har mottatt forespørselen din, men ingen tid ble booket. Studioet følger opp direkte.")}</p><p>${formatDate(record.dateStart)} - ${formatDate(record.dateEnd)}<br>${record.timeStart} - ${record.timeEnd}</p>`
  );
}

export async function processBooking(requestId: string) {
  const record = await getRecord(requestId);

  if (!record) {
    throw new Error("Booking request was not found.");
  }

  if (record.status === "confirmed" || record.status === "no_matching_time") {
    return;
  }

  if (record.status === "submitting") {
    await updateRecord(requestId, {
      status: "manual_review",
      workerError: "The previous worker run reached confirmation and needs review.",
    });
    await alertStudio(record, "The worker stopped after reaching the final confirmation step.");
    return;
  }

  const missingDetails = [
    !record.timeStart || !record.timeEnd ? "preferred time window" : "",
    !record.placement ? "body position" : "",
  ].filter(Boolean);

  if (missingDetails.length > 0) {
    const message = `Missing booking details: ${missingDetails.join(", ")}.`;
    await updateRecord(requestId, {
      status: "manual_review",
      workerError: message,
    });
    await sendBookingOutcomeEmail(record, false);
    await alertStudio(record, message);
    return;
  }

  const temporaryDirectory = await mkdtemp(join(tmpdir(), "infinity-booking-"));
  const browser = await chromium.launch({
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
    headless: true,
  });

  try {
    await updateRecord(requestId, { status: "checking_availability" });
    const page = await browser.newPage({ locale: record.locale === "NO" ? "nb-NO" : "en-GB" });
    await page.goto(bookingUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.getByText(/Velg tjenester|Choose services/i).waitFor({ state: "visible", timeout: 20_000 });
    await selectService(page, record);
    const referencePaths = await downloadReferences(record, temporaryDirectory);

    if (record.service === "tattoo") {
      await submitTattooRequest(page, record, referencePaths);
    } else {
      await clickNext(page);
      await selectDateAndTime(page, record);
      await clickNext(page);
      await fillCustomerDetails(page, record, referencePaths);
      await checkForChallenge(page);
    }

    if (process.env.DRY_RUN === "true") {
      await updateRecord(requestId, {
        status: "manual_review",
        workerError: "Dry run reached the final confirmation step without submitting.",
      });
      return;
    }

    await updateRecord(requestId, { status: "submitting" });
    await page
      .getByRole("button", { name: /Bekreft booking|Confirm booking|Send inn forespørselen|Submit request/i })
      .last()
      .click();
    await page.getByText(/Takk|bekreftet|bekreftelse|confirmed|thank you|mottatt/i).first().waitFor({
      state: "visible",
      timeout: 20_000,
    });

    await updateRecord(requestId, { status: "confirmed" });
    await sendBookingOutcomeEmail(record, true);
  } catch (error) {
    if (error instanceof NoMatchingTimeError) {
      await updateRecord(requestId, {
        status: "no_matching_time",
        workerError: error.message,
      });
      await sendBookingOutcomeEmail(record, false);
      await alertStudio(record, error.message);
      return;
    }

    if (error instanceof ManualReviewError) {
      await updateRecord(requestId, {
        status: "manual_review",
        workerError: error.message,
      });
      await sendBookingOutcomeEmail(record, false);
      await alertStudio(record, error.message);
      return;
    }

    await updateRecord(requestId, {
      status: "failed",
      workerError: "The booking worker encountered a temporary error.",
    });
    throw error;
  } finally {
    await browser.close();
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
}
