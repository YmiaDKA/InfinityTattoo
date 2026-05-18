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

const emailAddress = "infinitytattoo99@gmail.com";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      message,
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
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <Input id="firstName" name="firstName" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <Input id="lastName" name="lastName" required />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input id="phone" name="phone" required type="tel" />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" required type="email" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="message">Idea</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Placement, style, size, reference idea..."
            required
            rows={5}
          />
          <FieldDescription>
            The form opens your email app so the studio receives the request
            directly.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="w-full sm:w-fit" size="lg" type="submit">
          Send request
          <SendIcon data-icon="inline-end" />
        </Button>
        {submitted ? (
          <p className="text-sm text-muted-foreground">
            Email draft opened. Add references before sending if you have them.
          </p>
        ) : null}
      </div>
    </form>
  );
}
