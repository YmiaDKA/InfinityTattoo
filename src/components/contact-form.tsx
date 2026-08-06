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
          <FieldLabel htmlFor="idea">Tattoo idea</FieldLabel>
          <Textarea
            id="idea"
            name="idea"
            placeholder="Describe the idea, meaning, subject, or reference direction..."
            required
            rows={5}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="placement">Placement</FieldLabel>
            <Input
              id="placement"
              name="placement"
              placeholder="Forearm, sleeve, chest, back..."
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="size">Approx size</FieldLabel>
            <Input id="size" name="size" placeholder="10 cm, half sleeve..." />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="style">Style</FieldLabel>
            <Input
              id="style"
              name="style"
              placeholder="Black & grey, realism, portrait..."
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="firstTattoo">First tattoo?</FieldLabel>
            <Input id="firstTattoo" name="firstTattoo" placeholder="Yes / no" />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="timing">When do you want to start?</FieldLabel>
            <Input id="timing" name="timing" placeholder="As soon as possible..." />
          </Field>
          <Field>
            <FieldLabel htmlFor="budget">Budget range</FieldLabel>
            <Input id="budget" name="budget" placeholder="Optional" />
          </Field>
        </div>
        <FieldDescription>
          The form opens your email app so you can attach reference photos before
          sending.
        </FieldDescription>
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
