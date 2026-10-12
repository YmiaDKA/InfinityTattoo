import { Hono } from "hono";

import type { Env } from "../env";
import type { StaffUser } from "../lib/auth";
import { addDays, businessDate, localTime, osloToUtc } from "../lib/time";

export type AdminVars = { user: StaffUser };
export type AdminEnv = { Bindings: Env; Variables: AdminVars };
export const adminApp = () => new Hono<AdminEnv>();

export const METHOD_LABELS: Record<string, string> = {
  card: "Kort",
  vipps: "Vipps",
  cash: "Kontant",
  gift_card: "Gavekort",
  bank: "Bank/faktura",
  other: "Annet",
};
export const KIND_LABELS: Record<string, string> = {
  deposit: "Depositum",
  payment: "Betaling",
  refund: "Refusjon",
  gift_card_sale: "Gavekortsalg",
  product: "Produkt/smykke",
};

export type BookingRow = {
  id: number;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
  client_id: number;
  project_id: number | null;
  service_kind: string;
  client_name: string;
  client_phone: string | null;
  client_email: string | null;
  staff_id: number | null;
  staff_name: string | null;
  staff_color: string | null;
  service_id: number;
  service_name: string;
  idea: string | null;
  placement: string | null;
  size: string | null;
  style: string | null;
  first_tattoo: number | null;
  budget: string | null;
  price_ore: number | null;
  deposit_ore: number;
  internal_notes: string | null;
  source: string;
  created_at: string;
};

export const BOOKING_SELECT = `
  SELECT b.*, c.name AS client_name, c.phone AS client_phone, c.email AS client_email,
         s.name AS staff_name, s.color AS staff_color, sv.name_no AS service_name, sv.kind AS service_kind
  FROM bookings b
  JOIN clients c ON c.id = b.client_id
  JOIN services sv ON sv.id = b.service_id
  LEFT JOIN staff s ON s.id = b.staff_id`;

export function today() {
  return businessDate(new Date());
}

export function dayRange(date: string) {
  return [osloToUtc(date, "00:00").toISOString(), osloToUtc(addDays(date, 1), "00:00").toISOString()] as const;
}

export function when(b: { starts_at: string | null; ends_at: string | null }) {
  if (!b.starts_at) return "Ingen tid";
  return `${businessDate(b.starts_at)} ${localTime(b.starts_at)}–${b.ends_at ? localTime(b.ends_at) : ""}`;
}

export async function audit(env: Env, user: StaffUser, action: string, entity: string, entityId: number | null, detail?: unknown) {
  await env.DB.prepare("INSERT INTO audit_log (actor, action, entity, entity_id, detail) VALUES (?, ?, ?, ?, ?)")
    .bind(user.email, action, entity, entityId, detail === undefined ? null : JSON.stringify(detail))
    .run();
}

export async function staffList(env: Env) {
  return (
    await env.DB.prepare("SELECT id, name, role, color, studio_share_pct FROM staff WHERE active = 1 ORDER BY id").all<{
      id: number;
      name: string;
      role: string;
      color: string;
      studio_share_pct: number;
    }>()
  ).results;
}

export async function serviceList(env: Env) {
  return (
    await env.DB.prepare("SELECT id, name_no, duration_min, price_ore, deposit_ore FROM services WHERE active = 1 ORDER BY sort, id").all<{
      id: number;
      name_no: string;
      duration_min: number;
      price_ore: number | null;
      deposit_ore: number;
    }>()
  ).results;
}

export function str(body: Record<string, unknown>, key: string): string {
  const v = body[key];
  return typeof v === "string" ? v.trim() : "";
}


export const EMAIL_LABELS: Record<string, string> = {
  request_received: "Forespørsel mottatt",
  confirmation: "Bekreftelse",
  reminder: "Påminnelse",
  reminder_sms: "Påminnelse (SMS)",
  deposit_link: "Depositum-lenke",
  aftercare: "Etterbehandling",
  cancelled: "Avlysning",
};
