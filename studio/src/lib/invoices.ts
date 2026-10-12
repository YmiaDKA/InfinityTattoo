import type { Env } from "../env";
import { loadAccounting } from "./accounting";
import { formatOrgNumber, loadCompany, type Company } from "./company";
import { sendEmail, toBase64, type EmailResult } from "./email";
import { A4, PdfDoc } from "./pdf";
import { formatOre } from "./report";
import { businessDate } from "./time";

/**
 * Invoice mode (Innstillinger → Kassesystem, off by default): a numbered cash invoice
 * (kontantfaktura) for every sale, with the buyer's name and address, so the studio can document
 * card and Vipps sales without a declared till. Follows bokføringsforskriften § 5-1-1: number, date,
 * seller's name, address and org.nr., buyer's name and address, what was delivered, when and where,
 * the amount and the VAT. The accountant must approve relying on it. This is never a till: no
 * receipts, no cash drawer, no Z-report.
 */

export type Buyer = { name: string; address: string; postcode: string; city: string; email?: string | null };

export type InvoiceLine = { text: string; amount_ore: number; vat_pct: number; vat_ore: number };

export type Invoice = {
  id: number;
  number: number;
  kind: "invoice" | "credit_note";
  payment_id: number;
  credits_invoice_id: number | null;
  credits_number?: number | null;
  issue_date: string;
  delivery_date: string;
  client_id: number | null;
  buyer_name: string;
  buyer_address: string;
  buyer_postcode: string;
  buyer_city: string;
  buyer_email: string | null;
  seller_json: string;
  lines_json: string;
  total_ore: number;
  vat_ore: number;
  method: string;
  issued_by: string;
  email_status: string | null;
  emailed_at: string | null;
  created_at: string;
};

export type Seller = Company & { vatRegistered: boolean };

const METHODS: Record<string, string> = { card: "kort", vipps: "Vipps", cash: "kontant", gift_card: "gavekort", bank: "bankoverføring", other: "annet" };

export const buyerComplete = (b: Partial<Buyer> | null | undefined): b is Buyer =>
  Boolean(b?.name?.trim() && b.address?.trim() && b.postcode?.trim() && b.city?.trim());

/** What the seller must have filled in under Firmaopplysninger before an invoice can be issued. */
export function sellerMissing(c: Company): string[] {
  const missing: string[] = [];
  if (!formatOrgNumber(c.orgNumber)) missing.push("org.nr.");
  if (!c.address.trim() || !c.postcode.trim() || !c.city.trim()) missing.push("adresse");
  return missing;
}

/** When invoice mode was switched on; sales before that never get an invoice. Null when it's off. */
export async function invoicesSince(env: Env): Promise<string | null> {
  const row = await env.DB.prepare("SELECT updated_at FROM features WHERE key = 'invoices' AND enabled = 1").first<{ updated_at: string }>();
  return row?.updated_at ?? null;
}

export async function autoEmail(env: Env): Promise<boolean> {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'invoices.auto_email'").first<{ value: string }>();
  return row?.value !== "0";
}

export type PaymentForInvoice = {
  id: number;
  kind: string;
  method: string;
  amount_ore: number;
  note: string | null;
  business_date: string;
  booking_id: number | null;
  starts_at: string | null;
  service_name: string | null;
  vat_pct: number | null;
  staff_name: string | null;
  client_id: number | null;
  name: string | null;
  address: string | null;
  postcode: string | null;
  city: string | null;
  email: string | null;
};

const PAYMENT_SELECT = `
  SELECT p.id, p.kind, p.method, p.amount_ore, p.note, p.business_date, p.booking_id,
         b.starts_at, sv.name_no AS service_name, sv.vat_pct, s.name AS staff_name,
         cl.id AS client_id, cl.name, cl.address, cl.postcode, cl.city, cl.email
  FROM payments p
  LEFT JOIN bookings b ON b.id = p.booking_id
  LEFT JOIN services sv ON sv.id = b.service_id
  LEFT JOIN staff s ON s.id = p.staff_id
  LEFT JOIN clients cl ON cl.id = COALESCE(p.client_id, b.client_id)`;

/** Pure: the invoice lines for one payment. Exported for tests. */
export function invoiceLines(p: PaymentForInvoice, vatRegistered: boolean): InvoiceLine[] {
  const amount = p.amount_ore;
  const service = p.service_name ?? "Behandling";
  const who = p.staff_name ? `, ${p.staff_name}` : "";
  const when = p.starts_at ? ` ${businessDate(p.starts_at)}` : "";
  let text: string;
  let vatPct = vatRegistered ? (p.vat_pct ?? 25) : 0;
  if (p.kind === "gift_card_sale") {
    // A gift card is a voucher: VAT is charged when it's used, not when it's sold.
    text = `${p.note ?? "Gavekort"} (verdikort, mva beregnes når det brukes)`;
    vatPct = 0;
  } else if (p.kind === "deposit") text = `Depositum for ${service.toLowerCase()}${when}${who}`;
  else if (p.kind === "product") {
    text = p.note || "Smykke/produkt";
    vatPct = vatRegistered ? 25 : 0;
  } else if (p.kind === "refund") text = `Tilbakebetalt: ${p.note || service}`;
  else text = `${service}${who}`;
  if (p.method === "gift_card" && p.kind !== "gift_card_sale") text += " (betalt med gavekort)";
  const vat = vatPct ? Math.round((amount * vatPct) / (100 + vatPct)) : 0;
  return [{ text, amount_ore: amount, vat_pct: vatPct, vat_ore: vat }];
}

export type IssueResult = { ok: true; invoice: Invoice; created: boolean } | { ok: false; reason: "buyer" | "seller" | "missing"; message: string };

/** Issues the invoice (or credit note, for a refund) for one payment. Calling it twice returns the same invoice. */
export async function issueInvoice(env: Env, paymentId: number, by: string): Promise<IssueResult> {
  const existing = await env.DB.prepare("SELECT * FROM invoices WHERE payment_id = ?").bind(paymentId).first<Invoice>();
  if (existing) return { ok: true, invoice: existing, created: false };

  const p = await env.DB.prepare(`${PAYMENT_SELECT} WHERE p.id = ?`).bind(paymentId).first<PaymentForInvoice>();
  if (!p) return { ok: false, reason: "missing", message: "Fant ikke betalingen" };
  const [company, accounting] = await Promise.all([loadCompany(env), loadAccounting(env)]);
  const missing = sellerMissing(company);
  if (missing.length) return { ok: false, reason: "seller", message: `Fyll inn studioets ${missing.join(" og ")} under Firmaopplysninger` };
  const buyer = { name: p.name ?? "", address: p.address ?? "", postcode: p.postcode ?? "", city: p.city ?? "" };
  if (!buyerComplete(buyer)) return { ok: false, reason: "buyer", message: "Kunden mangler navn eller adresse" };

  const lines = invoiceLines(p, accounting.vatRegistered);
  const total = lines.reduce((n, l) => n + l.amount_ore, 0);
  const vat = lines.reduce((n, l) => n + l.vat_ore, 0);
  const seller: Seller = { ...company, orgNumber: formatOrgNumber(company.orgNumber), vatRegistered: accounting.vatRegistered };
  const isCredit = p.amount_ore < 0;
  // A refund credits the latest invoice for the same booking or client.
  const credits = isCredit
    ? await env.DB.prepare(
        `SELECT i.id FROM invoices i JOIN payments ip ON ip.id = i.payment_id
         WHERE i.kind = 'invoice' AND ((? IS NOT NULL AND ip.booking_id = ?) OR i.client_id = ?) ORDER BY i.number DESC LIMIT 1`,
      )
        .bind(p.booking_id, p.booking_id, p.client_id)
        .first<{ id: number }>()
    : null;

  // The number is taken in the same statement as the insert, so the series has no gaps or doubles.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const invoice = await env.DB.prepare(
        `INSERT INTO invoices (number, kind, payment_id, credits_invoice_id, issue_date, delivery_date, client_id, buyer_name, buyer_address,
           buyer_postcode, buyer_city, buyer_email, seller_json, lines_json, total_ore, vat_ore, method, issued_by)
         SELECT COALESCE(MAX(number), 0) + 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM invoices
         RETURNING *`,
      )
        .bind(
          isCredit ? "credit_note" : "invoice",
          p.id,
          credits?.id ?? null,
          businessDate(new Date()),
          p.business_date,
          p.client_id,
          buyer.name.trim(),
          buyer.address.trim(),
          buyer.postcode.trim(),
          buyer.city.trim(),
          p.email || null,
          JSON.stringify(seller),
          JSON.stringify(lines),
          total,
          vat,
          p.method,
          by,
        )
        .first<Invoice>();
      if (invoice && invoice.buyer_email && (await autoEmail(env))) await emailInvoice(env, invoice);
      return { ok: true, invoice: (await loadInvoice(env, invoice!.id))!, created: true };
    } catch (error) {
      const msg = String(error);
      if (msg.includes("invoices.payment_id")) {
        const again = await env.DB.prepare("SELECT * FROM invoices WHERE payment_id = ?").bind(paymentId).first<Invoice>();
        if (again) return { ok: true, invoice: again, created: false };
      }
      if (!msg.includes("UNIQUE") || attempt === 2) throw error;
    }
  }
  throw new Error("unreachable");
}

export async function loadInvoice(env: Env, id: number): Promise<Invoice | null> {
  return env.DB.prepare("SELECT i.*, c.number AS credits_number FROM invoices i LEFT JOIN invoices c ON c.id = i.credits_invoice_id WHERE i.id = ?")
    .bind(id)
    .first<Invoice>();
}

export const invoiceTitle = (i: Pick<Invoice, "kind" | "number">) => `${i.kind === "credit_note" ? "Kreditnota" : "Faktura"} ${i.number}`;
export const invoiceFilename = (i: Pick<Invoice, "kind" | "number">) => `${i.kind === "credit_note" ? "kreditnota" : "faktura"}-${i.number}.pdf`;

/** The invoice as a one-page A4 PDF. */
export function invoicePdf(inv: Invoice): Uint8Array {
  const s = JSON.parse(inv.seller_json) as Seller;
  const lines = JSON.parse(inv.lines_json) as InvoiceLine[];
  const M = 56;
  const R = A4.width - M;
  const doc = new PdfDoc(M, () => `${s.name} · org.nr. ${s.orgNumber}${s.vatRegistered ? " MVA" : ""} · ${invoiceTitle(inv)}`);

  // Seller top left, title top right.
  doc.text({ x: M, text: s.name, size: 16, bold: true });
  doc.text({ x: R, text: inv.kind === "credit_note" ? "KREDITNOTA" : "FAKTURA", size: 16, bold: true, align: "right" }, 20);
  const sellerLines = [
    s.address,
    `${s.postcode} ${s.city}`,
    `Org.nr. ${s.orgNumber}${s.vatRegistered ? " MVA" : ""}`,
    s.phone && `Tlf. ${s.phone}`,
    s.email,
  ].filter(Boolean) as string[];
  const meta: [string, string][] = [
    [inv.kind === "credit_note" ? "Kreditnotanr." : "Fakturanr.", String(inv.number)],
    ["Fakturadato", inv.issue_date],
    ["Leveringsdato", inv.delivery_date],
    ["Forfall", inv.issue_date],
    ...(inv.credits_number ? ([["Krediterer faktura", String(inv.credits_number)]] as [string, string][]) : []),
  ];
  for (let i = 0; i < Math.max(sellerLines.length, meta.length); i++) {
    if (sellerLines[i]) doc.text({ x: M, text: sellerLines[i], size: 10, gray: true });
    if (meta[i]) {
      doc.text({ x: R - 120, text: meta[i][0], size: 10, gray: true, align: "right" });
      doc.text({ x: R, text: meta[i][1], size: 10, align: "right" });
    }
    doc.gap(14);
  }

  doc.gap(20);
  doc.text({ x: M, text: "Kunde", size: 9, gray: true }, 14);
  for (const t of [inv.buyer_name, inv.buyer_address, `${inv.buyer_postcode} ${inv.buyer_city}`]) doc.text({ x: M, text: t, size: 11 }, 15);

  doc.gap(28);
  doc.text({ x: M, text: "Beskrivelse", size: 9, gray: true });
  doc.text({ x: 400, text: "Mva", size: 9, gray: true, align: "right" });
  doc.text({ x: R, text: "Beløp inkl. mva", size: 9, gray: true, align: "right" }, 16);
  doc.rule();
  doc.gap(2);
  for (const l of lines) {
    doc.text({ x: M, text: l.text.length > 70 ? `${l.text.slice(0, 69)}…` : l.text, size: 10 });
    doc.text({ x: 400, text: `${l.vat_pct} %`, size: 10, align: "right" });
    doc.text({ x: R, text: formatOre(l.amount_ore), size: 10, align: "right" }, 16);
  }
  doc.rule();
  doc.gap(6);
  const totals: [string, number, boolean][] = [
    ["Sum eks. mva", inv.total_ore - inv.vat_ore, false],
    ...lines.filter((l) => l.vat_pct).map((l) => [`Mva ${l.vat_pct} %`, l.vat_ore, false] as [string, number, boolean]),
    ["Totalt", inv.total_ore, true],
  ];
  for (const [label, amount, bold] of totals) {
    doc.text({ x: 400, text: label, size: bold ? 12 : 10, bold, align: "right" });
    doc.text({ x: R, text: formatOre(amount), size: bold ? 12 : 10, bold, align: "right" }, bold ? 20 : 15);
  }

  doc.gap(20);
  doc.text(
    {
      x: M,
      text:
        inv.kind === "credit_note"
          ? `Tilbakebetalt ${inv.delivery_date} med ${METHODS[inv.method] ?? inv.method}.`
          : `Betalt ${inv.delivery_date} med ${METHODS[inv.method] ?? inv.method}. Ingenting å betale.`,
      size: 10,
      bold: true,
    },
    15,
  );
  doc.text({ x: M, text: `Levert i studio: ${s.address}, ${s.postcode} ${s.city}.`, size: 10, gray: true }, 15);
  if (!s.vatRegistered) doc.text({ x: M, text: "Selger er ikke registrert i Merverdiavgiftsregisteret.", size: 10, gray: true }, 15);
  return doc.finish(invoiceTitle(inv));
}

export async function emailInvoice(env: Env, inv: Invoice, to = inv.buyer_email): Promise<EmailResult> {
  if (!to) return { status: "skipped", error: "ingen e-post" };
  const s = JSON.parse(inv.seller_json) as Seller;
  const full = (await loadInvoice(env, inv.id)) ?? inv;
  const result = await sendEmail(env, {
    to,
    subject: `${invoiceTitle(full)} fra ${s.name}`,
    text: [
      `Hei ${full.buyer_name.split(" ")[0]},`,
      "",
      full.kind === "credit_note"
        ? `Vedlagt er kreditnota ${full.number} på ${formatOre(full.total_ore)} for tilbakebetalingen ${full.delivery_date}.`
        : `Vedlagt er faktura ${full.number} på ${formatOre(full.total_ore)}. Den er allerede betalt, så du trenger ikke gjøre noe.`,
      "",
      `Hilsen ${s.name}`,
    ].join("\n"),
    attachments: [{ filename: invoiceFilename(full), content: toBase64(invoicePdf(full)) }],
  });
  await env.DB.prepare("UPDATE invoices SET email_status = ?, emailed_at = ? WHERE id = ?")
    .bind(result.status, result.status === "sent" ? new Date().toISOString() : null, inv.id)
    .run();
  return result;
}

export type MissingInvoice = { id: number; kind: string; method: string; amount_ore: number; business_date: string; booking_id: number | null; client_id: number | null; name: string | null; note: string | null };

/** Sales since invoice mode was switched on that still have no invoice, usually because the address is missing. */
export async function salesWithoutInvoice(env: Env): Promise<MissingInvoice[]> {
  const since = await invoicesSince(env);
  if (!since) return [];
  return (
    await env.DB.prepare(
      `SELECT p.id, p.kind, p.method, p.amount_ore, p.business_date, p.booking_id, cl.id AS client_id, COALESCE(cl.name, g.buyer_name) AS name, p.note
       FROM payments p
       LEFT JOIN bookings b ON b.id = p.booking_id
       LEFT JOIN clients cl ON cl.id = COALESCE(p.client_id, b.client_id)
       LEFT JOIN online_payments op ON op.provider_ref = p.provider_ref AND op.purpose = 'gift_card'
       LEFT JOIN gift_cards g ON g.id = op.gift_card_id
       WHERE p.created_at >= ? AND NOT EXISTS (SELECT 1 FROM invoices i WHERE i.payment_id = p.id)
       ORDER BY p.id DESC LIMIT 200`,
    )
      .bind(since)
      .all<MissingInvoice>()
  ).results;
}

/** Issues invoices for every sale that has what it needs (cron, and after a Zettle import). */
export async function sweepInvoices(env: Env, by = "system"): Promise<{ issued: number; waiting: number }> {
  let issued = 0;
  let waiting = 0;
  for (const p of await salesWithoutInvoice(env)) {
    const r = await issueInvoice(env, p.id, by);
    if (r.ok) issued++;
    else if (r.reason === "seller") return { issued, waiting: waiting + 1 };
    else waiting++;
  }
  return { issued, waiting };
}

/** Saves the buyer's address on the client, filling only what's given. */
export async function saveClientAddress(env: Env, clientId: number, b: Partial<Buyer>) {
  await env.DB.prepare(
    `UPDATE clients SET address = COALESCE(NULLIF(?, ''), address), postcode = COALESCE(NULLIF(?, ''), postcode),
       city = COALESCE(NULLIF(?, ''), city), email = COALESCE(NULLIF(?, ''), email) WHERE id = ?`,
  )
    .bind(b.address?.trim() ?? "", b.postcode?.trim() ?? "", b.city?.trim() ?? "", b.email?.trim().toLowerCase() ?? "", clientId)
    .run();
}

/** Finds the client by email or phone, or creates one, for a sale without a booking. */
export async function findOrCreateClient(env: Env, b: Buyer & { phone?: string | null }): Promise<number> {
  const email = b.email?.trim().toLowerCase() || null;
  const phone = b.phone?.trim() || null;
  const found =
    email || phone
      ? await env.DB.prepare("SELECT id FROM clients WHERE (? IS NOT NULL AND lower(email) = ?) OR (? IS NOT NULL AND phone = ?) ORDER BY id LIMIT 1")
          .bind(email, email, phone, phone)
          .first<{ id: number }>()
      : null;
  if (found) {
    await saveClientAddress(env, found.id, b);
    return found.id;
  }
  const row = await env.DB.prepare("INSERT INTO clients (name, email, phone, address, postcode, city) VALUES (?, ?, ?, ?, ?, ?) RETURNING id")
    .bind(b.name.trim(), email, phone, b.address.trim(), b.postcode.trim(), b.city.trim())
    .first<{ id: number }>();
  return row!.id;
}
