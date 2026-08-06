"use client";

import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";

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

const emailAddress = "infinitytattoo99@gmail.com";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const language = useLanguage();
  const isNorwegian = language === "NO";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const idea = String(formData.get("idea") ?? "");
    const placement = String(formData.get("placement") ?? "");
    const size = String(formData.get("size") ?? "");
    const style = String(formData.get("style") ?? "");
    const firstTattoo = String(formData.get("firstTattoo") ?? "");
    const timing = String(formData.get("timing") ?? "");
    const budget = String(formData.get("budget") ?? "");

    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      `Idea: ${idea}`,
      `Placement: ${placement}`,
      `Approx size: ${size}`,
      `Style: ${style}`,
      `First tattoo: ${firstTattoo}`,
      `Timing: ${timing}`,
      `Budget: ${budget}`,
      "",
      "Reference photos can be attached to this email before sending.",
    ].join("\n");

    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      "Tattoo consultation"
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <FieldGroup>
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
                ? "Beskriv ideen, betydningen, motivet eller referansene..."
                : "Describe the idea, meaning, subject, or reference direction..."
            }
            required
            rows={5}
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
              placeholder={
                isNorwegian ? "Underarm, sleeve, bryst, rygg..." : "Forearm, sleeve, chest, back..."
              }
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="size">
              {isNorwegian ? "Omtrent størrelse" : "Approx size"}
            </FieldLabel>
            <Input
              id="size"
              name="size"
              placeholder={isNorwegian ? "10 cm, half sleeve..." : "10 cm, half sleeve..."}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
          <Field>
            <FieldLabel htmlFor="firstTattoo">
              {isNorwegian ? "Første tatovering?" : "First tattoo?"}
            </FieldLabel>
            <Input
              id="firstTattoo"
              name="firstTattoo"
              placeholder={isNorwegian ? "Ja / nei" : "Yes / no"}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="timing">
              {isNorwegian ? "Når vil du starte?" : "When do you want to start?"}
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
            <Input
              id="budget"
              name="budget"
              placeholder={isNorwegian ? "Valgfritt" : "Optional"}
            />
          </Field>
        </div>
        <FieldDescription>
          {isNorwegian
            ? "Skjemaet åpner e-postappen din, slik at du kan legge ved referansebilder før du sender."
            : "The form opens your email app so you can attach reference photos before sending."}
        </FieldDescription>
      </FieldGroup>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="w-full sm:w-fit" size="lg" type="submit">
          {isNorwegian ? "Send forespørsel" : "Send request"}
          <SendIcon data-icon="inline-end" />
        </Button>
        {submitted ? (
          <p className="text-sm text-muted-foreground">
            {isNorwegian
              ? "E-postutkast åpnet. Legg ved referanser før du sender hvis du har det."
              : "Email draft opened. Add references before sending if you have them."}
          </p>
        ) : null}
      </div>
    </form>
  );
}
