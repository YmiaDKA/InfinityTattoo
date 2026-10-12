"use client";

import { CalendarCheckIcon, Loader2Icon, SendIcon } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { LineworkBooking } from "@/components/linework-booking";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";

// Set this when the studio system is deployed. Until then the Linework embed keeps working.
const apiUrl = process.env.NEXT_PUBLIC_STUDIO_API_URL?.replace(/\/$/, "");

type StaffOption = { id: number; name: string; role: string };
type Service = {
  id: number;
  name_no: string;
  name_en: string;
  kind: "consultation" | "tattoo" | "piercing" | "tooth_gem" | "other";
  duration_min: number;
  price_ore: number | null;
  deposit_ore: number;
  requires_approval: boolean;
  staff: StaffOption[];
};
type Day = { date: string; staff_id: number; staff_name: string; slots: { starts_at: string; time: string }[] };

const kroner = (ore: number) => `${Math.round(ore / 100).toLocaleString("nb-NO")} kr`;

export function StudioBooking() {
  if (!apiUrl) return <LineworkBooking />;
  return <StudioBookingForm api={apiUrl} />;
}

function StudioBookingForm({ api }: { api: string }) {
  const isNorwegian = useLanguage() === "NO";
  const t = (no: string, en: string) => (isNorwegian ? no : en);

  const [services, setServices] = useState<Service[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [staffId, setStaffId] = useState<number | null>(null);
  const [days, setDays] = useState<Day[] | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [startsAt, setStartsAt] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "taken">("idle");
  const [result, setResult] = useState<"requested" | "confirmed" | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`${api}/api/services`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { services: Service[] }) => setServices(data.services))
      .catch(() => setLoadError(true));
  }, [api]);

  const service = services?.find((s) => s.id === serviceId) ?? null;
  const needsTime = service ? !service.requires_approval : false;

  useEffect(() => {
    if (!service || service.requires_approval) return;
    let cancelled = false;
    const params = new URLSearchParams({ service: String(service.id), days: "21" });
    if (staffId) params.set("staff", String(staffId));
    fetch(`${api}/api/availability?${params}`)
      .then((r) => r.json())
      .then((data: { days: Day[] }) => {
        if (!cancelled) setDays(data.days);
      })
      .catch(() => {
        if (!cancelled) setDays([]);
      });
    return () => {
      cancelled = true;
    };
  }, [api, service, staffId, reload]);

  // Merge slots from all artists per date when "any artist" is chosen.
  const byDate = useMemo(() => {
    const map = new Map<string, Map<string, string>>();
    for (const d of days ?? []) {
      const slots = map.get(d.date) ?? new Map<string, string>();
      for (const s of d.slots) slots.set(s.starts_at, s.time);
      map.set(d.date, slots);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([d, slots]) => ({ date: d, slots: [...slots.entries()].sort(([a], [b]) => a.localeCompare(b)) }));
  }, [days]);

  function chooseService(id: number) {
    setServiceId(id);
    setStaffId(null);
    setDays(null);
    setDate(null);
    setStartsAt(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service) return;
    const form = new FormData(event.currentTarget);
    const get = (key: string) => {
      const value = String(form.get(key) ?? "").trim();
      return value || undefined;
    };
    const firstTattoo = get("firstTattoo");

    setState("sending");
    try {
      const response = await fetch(`${api}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: service.id,
          staff_id: staffId,
          starts_at: needsTime ? startsAt : null,
          name: `${get("firstName") ?? ""} ${get("lastName") ?? ""}`.trim(),
          email: get("email"),
          phone: get("phone"),
          idea: get("idea"),
          placement: get("placement"),
          size: get("size"),
          style: get("style"),
          first_tattoo: firstTattoo ? firstTattoo === "yes" : undefined,
          budget: get("budget"),
          timing: get("timing"),
          website: get("website"),
          language: isNorwegian ? "no" : "en",
        }),
      });
      const data = (await response.json()) as { status?: "requested" | "confirmed"; error?: string };
      if (response.status === 409) {
        setState("taken");
        setStartsAt(null);
        setDays(null);
        setReload((n) => n + 1);
        return;
      }
      if (!response.ok) throw new Error(data.error);
      setResult(data.status ?? "requested");
      setState("done");
      window.dispatchEvent(new CustomEvent("studio-booking-complete"));
    } catch {
      setState("error");
    }
  }

  if (loadError) return <LineworkBooking />;

  if (state === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border bg-background p-10 text-center">
        <CalendarCheckIcon className="size-10 text-[color:var(--studio-gold)]" />
        <h3 className="font-display text-2xl font-bold">
          {result === "confirmed" ? t("Timen er booket!", "You're booked!") : t("Takk for forespørselen!", "Thanks for your request!")}
        </h3>
        <p className="max-w-md text-muted-foreground">
          {result === "confirmed"
            ? t("Du får en bekreftelse fra oss. Ta kontakt hvis du må endre timen.", "We'll confirm with you. Get in touch if you need to change the time.")
            : t(
                "Vi ser på ideen din og tar kontakt for å avtale tid og pris. Send gjerne referansebilder på Instagram eller e-post.",
                "We'll look at your idea and get back to you about time and price. Feel free to send reference photos on Instagram or email.",
              )}
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6 rounded-3xl border bg-background p-5 sm:p-8" onSubmit={handleSubmit}>
      <section className="flex flex-col gap-3">
        <h3 className="font-display text-xl font-bold">{t("1. Hva vil du booke?", "1. What would you like to book?")}</h3>
        {!services ? (
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => chooseService(s.id)}
                aria-pressed={s.id === serviceId}
                className={cn(
                  "flex flex-col items-start rounded-2xl border p-4 text-left transition hover:bg-card",
                  s.id === serviceId && "border-[color:var(--studio-gold)] bg-card",
                )}
              >
                <span className="font-medium">{isNorwegian ? s.name_no : s.name_en}</span>
                <span className="text-sm text-muted-foreground">
                  {s.requires_approval
                    ? t("Send idé – vi foreslår tid og pris", "Send your idea – we suggest time and price")
                    : `${s.duration_min} min${s.price_ore ? ` · ${kroner(s.price_ore)}` : s.price_ore === 0 ? t(" · gratis", " · free") : ""}`}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {service && service.staff.length > 1 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-bold">{t("2. Hvem?", "2. With whom?")}</h3>
          <div className="flex flex-wrap gap-2">
            {[{ id: null, name: t("Første ledige", "First available") }, ...service.staff].map((m) => (
              <button
                key={m.id ?? "any"}
                type="button"
                aria-pressed={staffId === m.id}
                onClick={() => {
                  setStaffId(m.id);
                  setDays(null);
                  setDate(null);
                  setStartsAt(null);
                }}
                className={cn("rounded-full border px-4 py-2 text-sm transition hover:bg-card", staffId === m.id && "border-[color:var(--studio-gold)] bg-card")}
              >
                {m.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {service && needsTime && (
        <section className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-bold">{t("Velg tid", "Pick a time")}</h3>
          {state === "taken" && (
            <p className="text-sm text-destructive">{t("Den tiden ble nettopp tatt. Velg en annen.", "That time was just taken. Please pick another.")}</p>
          )}
          {!days ? (
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          ) : byDate.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("Ingen ledige timer de neste ukene. Ring eller send oss en melding.", "No free times in the coming weeks. Call or message us.")}
            </p>
          ) : (
            <>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {byDate.map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    aria-pressed={date === d.date}
                    onClick={() => {
                      setDate(d.date);
                      setStartsAt(null);
                    }}
                    className={cn(
                      "flex min-w-20 shrink-0 flex-col items-center rounded-2xl border px-3 py-2 text-sm capitalize transition hover:bg-card",
                      date === d.date && "border-[color:var(--studio-gold)] bg-card",
                    )}
                  >
                    {new Intl.DateTimeFormat(isNorwegian ? "nb-NO" : "en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(
                      new Date(`${d.date}T12:00:00Z`),
                    )}
                  </button>
                ))}
              </div>
              {date && (
                <div className="flex flex-wrap gap-2">
                  {byDate
                    .find((d) => d.date === date)
                    ?.slots.map(([iso, time]) => (
                      <button
                        key={iso}
                        type="button"
                        aria-pressed={startsAt === iso}
                        onClick={() => setStartsAt(iso)}
                        className={cn("rounded-full border px-4 py-2 text-sm tabular-nums transition hover:bg-card", startsAt === iso && "border-[color:var(--studio-gold)] bg-card")}
                      >
                        {time}
                      </button>
                    ))}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {service && (!needsTime || startsAt) && (
        <section className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-bold">{t("Om deg", "About you")}</h3>
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="sb-firstName">{t("Fornavn", "First name")}</FieldLabel>
                <Input id="sb-firstName" name="firstName" autoComplete="given-name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="sb-lastName">{t("Etternavn", "Last name")}</FieldLabel>
                <Input id="sb-lastName" name="lastName" autoComplete="family-name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="sb-phone">{t("Telefon", "Phone")}</FieldLabel>
                <Input id="sb-phone" name="phone" type="tel" autoComplete="tel" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="sb-email">Email</FieldLabel>
                <Input id="sb-email" name="email" type="email" autoComplete="email" required />
              </Field>
            </div>

            {service.kind === "tattoo" && (
              <>
                <Field>
                  <FieldLabel htmlFor="sb-idea">{t("Tatoveringsidé", "Tattoo idea")}</FieldLabel>
                  <Textarea
                    id="sb-idea"
                    name="idea"
                    rows={5}
                    required
                    placeholder={t("Beskriv ideen, betydningen, motivet eller referansene...", "Describe the idea, meaning, subject, or reference direction...")}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="sb-placement">{t("Plassering", "Placement")}</FieldLabel>
                    <Input id="sb-placement" name="placement" required placeholder={t("Underarm, sleeve, bryst, rygg...", "Forearm, sleeve, chest, back...")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sb-size">{t("Omtrent størrelse", "Approx size")}</FieldLabel>
                    <Input id="sb-size" name="size" placeholder="10 cm, half sleeve..." />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sb-style">{t("Stil", "Style")}</FieldLabel>
                    <Input id="sb-style" name="style" placeholder={t("Black & grey, realisme, portrett...", "Black & grey, realism, portrait...")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sb-firstTattoo">{t("Første tatovering?", "First tattoo?")}</FieldLabel>
                    <select
                      id="sb-firstTattoo"
                      name="firstTattoo"
                      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base md:text-sm dark:bg-input/30"
                      defaultValue=""
                    >
                      <option value="">–</option>
                      <option value="yes">{t("Ja", "Yes")}</option>
                      <option value="no">{t("Nei", "No")}</option>
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sb-timing">{t("Når vil du starte?", "When do you want to start?")}</FieldLabel>
                    <Input id="sb-timing" name="timing" placeholder={t("Så fort som mulig...", "As soon as possible...")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sb-budget">{t("Budsjett", "Budget range")}</FieldLabel>
                    <Input id="sb-budget" name="budget" placeholder={t("Valgfritt", "Optional")} />
                  </Field>
                </div>
              </>
            )}

            {/* Honeypot for bots; hidden from people and screen readers. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <FieldDescription>
              {t(
                "Vi bruker opplysningene bare til å håndtere bookingen din.",
                "We only use your details to handle your booking.",
              )}
            </FieldDescription>
          </FieldGroup>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full sm:w-fit" size="lg" type="submit" disabled={state === "sending"}>
              {service.requires_approval ? t("Send forespørsel", "Send request") : t("Book time", "Book appointment")}
              {state === "sending" ? <Loader2Icon className="animate-spin" data-icon="inline-end" /> : <SendIcon data-icon="inline-end" />}
            </Button>
            {state === "error" && (
              <p className="text-sm text-destructive">
                {t("Noe gikk galt. Prøv igjen, eller ring oss på 40 34 47 75.", "Something went wrong. Try again, or call us on +47 40 34 47 75.")}
              </p>
            )}
          </div>
        </section>
      )}
    </form>
  );
}
