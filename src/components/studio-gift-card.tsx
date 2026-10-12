"use client";

import { GiftIcon, Loader2Icon } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";

const apiUrl = process.env.NEXT_PUBLIC_STUDIO_API_URL?.replace(/\/$/, "");
const presets = [500, 1000, 1500, 2000];

/** Gift card purchase through the studio system; shows `fallback` (the Linework link) until it's live. */
export function StudioGiftCard({ fallback }: { fallback: ReactNode }) {
  const isNorwegian = useLanguage() === "NO";
  const t = (no: string, en: string) => (isNorwegian ? no : en);
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [state, setState] = useState<"idle" | "sending" | "error" | "paid">("idle");

  useEffect(() => {
    if (!apiUrl) return;
    fetch(`${apiUrl}/api/config`)
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg: { gift_cards?: boolean } | null) => {
        setEnabled(Boolean(cfg?.gift_cards));
        if (new URLSearchParams(window.location.search).get("giftcard") === "paid") setState("paid");
      })
      .catch(() => undefined);
  }, []);

  if (!enabled) return <>{fallback}</>;

  if (state === "paid") {
    return (
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        {t("Takk! Gavekortet er sendt til e-posten din.", "Thanks! The gift card has been sent to your email.")}
      </p>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim() || undefined;
    setState("sending");
    try {
      const res = await fetch(`${apiUrl}/api/gift-cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_kr: amount,
          buyer_name: get("buyerName"),
          buyer_email: get("buyerEmail"),
          recipient_name: get("recipientName"),
          message: get("message"),
          website: get("website"),
        }),
      });
      const data = (await res.json()) as { payment_url?: string };
      if (!res.ok || !data.payment_url) throw new Error();
      window.location.assign(data.payment_url);
    } catch {
      setState("error");
    }
  }

  if (!open) {
    return (
      <Button className="rounded-full" size="lg" onClick={() => setOpen(true)}>
        {t("Kjøp gavekort", "Buy gift card")}
        <GiftIcon data-icon="inline-end" />
      </Button>
    );
  }

  return (
    <form className="flex w-full max-w-md flex-col gap-4 rounded-3xl border bg-background p-5 text-left" onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={amount === p}
            onClick={() => setAmount(p)}
            className={cn("rounded-full border px-4 py-2 text-sm transition hover:bg-card", amount === p && "border-[color:var(--studio-gold)] bg-card")}
          >
            {p.toLocaleString("nb-NO")} kr
          </button>
        ))}
        <Input
          aria-label={t("Annet beløp", "Other amount")}
          type="number"
          min={200}
          max={20000}
          step={100}
          className="w-28"
          placeholder={t("Annet", "Other")}
          onChange={(e) => e.target.value && setAmount(Number(e.target.value))}
        />
      </div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="gc-buyerName">{t("Ditt navn", "Your name")}</FieldLabel>
          <Input id="gc-buyerName" name="buyerName" required autoComplete="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="gc-buyerEmail">{t("Din e-post (gavekortet sendes hit)", "Your email (the gift card is sent here)")}</FieldLabel>
          <Input id="gc-buyerEmail" name="buyerEmail" type="email" required autoComplete="email" />
        </Field>
        <Field>
          <FieldLabel htmlFor="gc-recipientName">{t("Til (valgfritt)", "To (optional)")}</FieldLabel>
          <Input id="gc-recipientName" name="recipientName" />
        </Field>
        <Field>
          <FieldLabel htmlFor="gc-message">{t("Hilsen (valgfritt)", "Message (optional)")}</FieldLabel>
          <Input id="gc-message" name="message" maxLength={300} />
        </Field>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </FieldGroup>
      <Button type="submit" size="lg" disabled={state === "sending" || amount < 200}>
        {t(`Betal ${amount.toLocaleString("nb-NO")} kr`, `Pay ${amount.toLocaleString("nb-NO")} kr`)}
        {state === "sending" && <Loader2Icon className="animate-spin" data-icon="inline-end" />}
      </Button>
      {state === "error" && <p className="text-sm text-destructive">{t("Noe gikk galt. Prøv igjen.", "Something went wrong. Please try again.")}</p>}
    </form>
  );
}
