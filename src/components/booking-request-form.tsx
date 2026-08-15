"use client";

import {
  CalendarDaysIcon,
  ImagePlusIcon,
  SendIcon,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-store";

type RequestStatus = "idle" | "uploading" | "submitting" | "success" | "error";

const maxFiles = 5;
const maxFileSize = 8 * 1024 * 1024;
const maxTotalSize = 20 * 1024 * 1024;

function createRequestId() {
  const cryptoApi = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;

  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  if (!cryptoApi?.getRandomValues) {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
      const value = Math.floor(Math.random() * 16);
      const nibble = character === "x" ? value : (value & 0x3) | 0x8;
      return nibble.toString(16);
    });
  }

  const random = new Uint8Array(16);
  cryptoApi.getRandomValues(random);
  random[6] = (random[6] & 0x0f) | 0x40;
  random[8] = (random[8] & 0x3f) | 0x80;
  const hex = Array.from(random, (value) => value.toString(16).padStart(2, "0"));

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export function BookingRequestForm() {
  const language = useLanguage();
  const isNorwegian = language === "NO";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [requestId] = useState(createRequestId);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const files = Array.from(fileInputRef.current?.files ?? []);
    const totalSize = files.reduce((total, file) => total + file.size, 0);

    if (files.length > maxFiles) {
      setStatus("error");
      setError(
        isNorwegian
          ? `Velg maksimalt ${maxFiles} referansebilder.`
          : `Choose up to ${maxFiles} reference images.`
      );
      return;
    }

    if (files.some((file) => !file.type.startsWith("image/"))) {
      setStatus("error");
      setError(
        isNorwegian
          ? "Referansebilder må være bildefiler."
          : "Reference files must be images."
      );
      return;
    }

    if (files.some((file) => file.size > maxFileSize) || totalSize > maxTotalSize) {
      setStatus("error");
      setError(
        isNorwegian
          ? "Hvert bilde kan være opptil 8 MB, og total størrelse er 20 MB."
          : "Each image can be up to 8 MB, with a 20 MB total limit."
      );
      return;
    }

    try {
      setStatus(files.length ? "uploading" : "submitting");
      const referenceImages: Array<{
        contentType: string;
        fileName: string;
        objectName: string;
      }> = [];

      for (const file of files) {
        const uploadResponse = await fetch("/api/booking-upload", {
          body: JSON.stringify({
            contentType: file.type,
            draftId: requestId,
            fileName: file.name,
            size: file.size,
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        if (!uploadResponse.ok) {
          throw new Error("Reference upload failed.");
        }

        const upload = (await uploadResponse.json()) as {
          objectName: string;
          uploadUrl: string;
        };
        const fileResponse = await fetch(upload.uploadUrl, {
          body: file,
          headers: { "Content-Type": file.type },
          method: "PUT",
        });

        if (!fileResponse.ok) {
          throw new Error("Reference upload failed.");
        }

        referenceImages.push({
          contentType: file.type,
          fileName: file.name,
          objectName: upload.objectName,
        });
      }

      setStatus("submitting");
      const response = await fetch("/api/booking-request", {
        body: JSON.stringify({
          budget: String(formData.get("budget") ?? ""),
          consent: formData.get("consent") === "on",
          dateEnd: String(formData.get("dateEnd") ?? ""),
          dateStart: String(formData.get("dateStart") ?? ""),
          email: String(formData.get("email") ?? ""),
          firstName: String(formData.get("firstName") ?? ""),
          fullName: `${String(formData.get("firstName") ?? "")} ${String(
            formData.get("lastName") ?? ""
          )}`.trim(),
          idea: String(formData.get("idea") ?? ""),
          lastName: String(formData.get("lastName") ?? ""),
          locale: language,
          note: String(formData.get("note") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          placement: String(formData.get("placement") ?? ""),
          referenceImages,
          requestId,
          service: String(formData.get("service") ?? "consultation"),
          size: String(formData.get("size") ?? ""),
          style: String(formData.get("style") ?? ""),
          timeEnd: String(formData.get("timeEnd") ?? ""),
          timeStart: String(formData.get("timeStart") ?? ""),
          timing: String(formData.get("timing") ?? ""),
          website: String(formData.get("website") ?? ""),
        }),
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId,
        },
        method: "POST",
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Booking request failed.");
      }

      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error && submissionError.message
          ? submissionError.message
          : isNorwegian
            ? "Noe gikk galt. Prøv igjen."
            : "Something went wrong. Please try again."
      );
    }
  }

  const isSubmitting = status === "uploading" || status === "submitting";

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="service">
              {isNorwegian ? "Hva gjelder forespørselen?" : "What are you booking?"}
            </FieldLabel>
            <select
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              defaultValue="consultation"
              id="service"
              name="service"
            >
              <option value="consultation">
                {isNorwegian ? "Konsultasjon" : "Consultation"}
              </option>
              <option value="tattoo">
                {isNorwegian ? "Tatoveringstime" : "Tattoo session"}
              </option>
              <option value="tooth-gems">
                {isNorwegian ? "Tannsmykke" : "Tooth gems"}
              </option>
            </select>
          </Field>
          <Field>
            <FieldLabel htmlFor="style">
              {isNorwegian ? "Stil" : "Style"}
            </FieldLabel>
            <Input
              id="style"
              name="style"
              placeholder={
                isNorwegian
                  ? "Black & grey, realisme, portrett..."
                  : "Black & grey, realism, portrait..."
              }
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="dateStart">
              {isNorwegian ? "Fra dato" : "Date from"}
            </FieldLabel>
            <div className="relative">
              <Input id="dateStart" name="dateStart" required type="date" />
              <CalendarDaysIcon className="pointer-events-none absolute right-2.5 top-1.5 size-4 text-muted-foreground" />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="dateEnd">
              {isNorwegian ? "Til dato" : "Date to"}
            </FieldLabel>
            <div className="relative">
              <Input id="dateEnd" name="dateEnd" required type="date" />
              <CalendarDaysIcon className="pointer-events-none absolute right-2.5 top-1.5 size-4 text-muted-foreground" />
            </div>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="timeStart">
              {isNorwegian ? "Tidligst" : "Earliest time"}
            </FieldLabel>
            <Input id="timeStart" name="timeStart" required type="time" />
          </Field>
          <Field>
            <FieldLabel htmlFor="timeEnd">
              {isNorwegian ? "Senest" : "Latest time"}
            </FieldLabel>
            <Input id="timeEnd" name="timeEnd" required type="time" />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="firstName">
              {isNorwegian ? "Fornavn" : "First name"}
            </FieldLabel>
            <Input id="firstName" name="firstName" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">
              {isNorwegian ? "Etternavn" : "Last name"}
            </FieldLabel>
            <Input id="lastName" name="lastName" required />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="phone">
              {isNorwegian ? "Telefon" : "Phone"}
            </FieldLabel>
            <Input id="phone" name="phone" required type="tel" />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" required type="email" />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="idea">
            {isNorwegian ? "Tatoveringsidé" : "Tattoo idea"}
          </FieldLabel>
          <Textarea
            id="idea"
            name="idea"
            placeholder={
              isNorwegian
                ? "Beskriv ideen, motivet, betydningen eller referansene..."
                : "Describe the idea, subject, meaning, or reference direction..."
            }
            required
            rows={4}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="placement">
              {isNorwegian ? "Plassering" : "Placement"}
            </FieldLabel>
            <Input
              id="placement"
              name="placement"
              placeholder={isNorwegian ? "Underarm, sleeve, bryst..." : "Forearm, sleeve, chest..."}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="size">
              {isNorwegian ? "Omtrent størrelse" : "Approximate size"}
            </FieldLabel>
            <Input id="size" name="size" placeholder="10 cm, half sleeve..." />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="timing">
              {isNorwegian ? "Når vil du starte?" : "When would you like to start?"}
            </FieldLabel>
            <Input
              id="timing"
              name="timing"
              placeholder={isNorwegian ? "Så fort som mulig..." : "As soon as possible..."}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="budget">
              {isNorwegian ? "Budsjett" : "Budget range"}
            </FieldLabel>
            <Input id="budget" name="budget" placeholder={isNorwegian ? "Valgfritt" : "Optional"} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="note">
            {isNorwegian ? "Notat til artisten" : "Note to the artist"}
          </FieldLabel>
          <Textarea
            id="note"
            name="note"
            placeholder={
              isNorwegian
                ? "Noe annet du vil at Filip skal vite?"
                : "Anything else Filip should know?"
            }
            rows={3}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="reference-images">
            <ImagePlusIcon className="size-4 text-[color:var(--studio-red)]" />
            {isNorwegian ? "Referansebilder" : "Reference images"}
          </FieldLabel>
          <Input
            accept="image/*"
            id="reference-images"
            multiple
            name="reference-images"
            ref={fileInputRef}
            type="file"
          />
          <FieldDescription>
            {isNorwegian
              ? "Valgfritt. Opptil 5 bilder, maks 8 MB per bilde."
              : "Optional. Up to 5 images, maximum 8 MB each."}
          </FieldDescription>
        </Field>
      </FieldGroup>

      <input
        aria-hidden="true"
        autoComplete="off"
        className="absolute -left-[9999px] h-px w-px opacity-0"
        name="website"
        tabIndex={-1}
        type="text"
      />

      <label className="flex items-start gap-3 text-sm leading-5 text-muted-foreground">
        <input className="mt-1 size-4 accent-[var(--studio-red)]" name="consent" required type="checkbox" />
        <span>
          {isNorwegian
            ? "Jeg godtar at Infinity Tattoo bruker opplysningene mine til å behandle bookingforespørselen."
            : "I agree that Infinity Tattoo may use my details to process this booking request."}
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="w-full sm:w-fit" disabled={isSubmitting} size="lg" type="submit">
          {status === "uploading"
            ? isNorwegian
              ? "Laster opp..."
              : "Uploading..."
            : status === "submitting"
              ? isNorwegian
                ? "Sender..."
                : "Sending..."
              : isNorwegian
                ? "Send bookingforespørsel"
                : "Send booking request"}
          <SendIcon data-icon="inline-end" />
        </Button>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {status === "success"
            ? isNorwegian
              ? "Forespørselen er mottatt. Studioet følger opp og bekrefter tidspunktet."
              : "Your request was received. The studio will follow up and confirm the time."
            : status === "error"
              ? error
              : isNorwegian
                ? "Vi sjekker ønsket tidsrom i bookingkalenderen før studioet bekrefter."
                : "We check your requested window in the booking calendar before the studio confirms."}
        </p>
      </div>
    </form>
  );
}
