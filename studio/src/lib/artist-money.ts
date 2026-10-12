import type { Env } from "../env";
import { loadAccounting, vatOf } from "./accounting";
import { formatOrgNumber, loadCompany, type Company } from "./company";
import { sendEmail, toBase64, type EmailResult } from "./email";
import { A4, PdfDoc } from "./pdf";
import { formatOre } from "./report";
import { addDays } from "./time";

/**
 * Money between the studio and its artists (Linework: Settlements → Invoices / Studio commissions,
 * and artist payouts). PLACEHOLDER-RESCAN: Linework's invoice form, invoice PDF and payout flow were
 * never reached in the trial, so this is our guess: the studio invoices an artist for chair rent and,
 * when the artist took the payment themselves, the studio's commission; and it records what it paid
 * out to the artist from sales that went through the studio. Invoices have their own number series.
 */

export const DUE_DAYS = [7, 14, 30] as const;
export const INVOICE_VAT = [25, 15, 12, 0] as const;

export type ArtistLine = { text: string; kind: "rent" | "commission" | "other"; amount_ore: number; vat_pct: number; vat_ore: number };

export type ArtistInvoice = {
  id: number;
  number: number;
  staff_id: number;
  buyer_name: string;
  buyer_address: string | null;
  seller_json: string;
  period_from: string;
  period_to: string;
  issue_date: string;
  due_date: string;
  lines_json: string;
  total_ore: number;
  vat_ore: number;
  status: "open" | "paid" | "void";
  emailed_at: string | null;
  paid_at: string | null;
  created_at: string;
};

/** What an artist made in a period: sales on them, the studio's share, rent, and what's already invoiced and paid out. */
export type ArtistPeriod = { gross: number; commission: number; invoicedRent: number; invoicedCommission: number; paidOut: number };

/** Pure: the invoice lines from amounts incl. VAT. Exported for tests. */
export function artistLines(items: { text: string; kind: ArtistLine["kind"]; amount_ore: number }[], vatPct: number): ArtistLine[] {
  return items.filter((i) => i.amount_ore > 0).map((i) => ({ ...i, vat_pct: vatPct, vat_ore: vatOf(i.amount_ore, vatPct) }));
}

/** Pure: what the studio still owes an artist for a period. Rent that is invoiced separately isn't deducted again. */
export function payoutDue(p: ArtistPeriod, rentMonths: number, monthlyRent: number): number {
  const rentToDeduct = Math.max(0, monthlyRent * rentMonths - p.invoicedRent);
  return Math.max(0, p.gross - p.commission - rentToDeduct - p.paidOut);
}

/** Pure: an open invoice past its due date counts as overdue. */
export const invoiceStatus = (inv: Pick<ArtistInvoice, "status" | "due_date">, today: string) => (inv.status === "open" && inv.due_date < today ? "overdue" : inv.status);

export const STATUS_LABELS: Record<string, string> = { open: "Ubetalt", overdue: "Forfalt", paid: "Betalt", void: "Kreditert" };

export async function artistPeriod(env: Env, staff: { id: number; studio_share_pct: number }, from: string, to: string): Promise<ArtistPeriod> {
  const [sales, invoices, payouts] = await Promise.all([
    env.DB.prepare("SELECT COALESCE(SUM(amount_ore), 0) AS n FROM payments WHERE staff_id = ? AND business_date BETWEEN ? AND ? AND kind != 'gift_card_sale'").bind(staff.id, from, to).first<{ n: number }>(),
    env.DB.prepare("SELECT lines_json FROM artist_invoices WHERE staff_id = ? AND status != 'void' AND period_from <= ? AND period_to >= ?").bind(staff.id, to, from).all<{ lines_json: string }>(),
    env.DB.prepare("SELECT COALESCE(SUM(amount_ore), 0) AS n FROM artist_payouts WHERE staff_id = ? AND period_from <= ? AND period_to >= ?").bind(staff.id, to, from).first<{ n: number }>(),
  ]);
  const lines = invoices.results.flatMap((r) => JSON.parse(r.lines_json) as ArtistLine[]);
  const sum = (kind: string) => lines.filter((l) => l.kind === kind).reduce((n, l) => n + l.amount_ore, 0);
  const gross = sales?.n ?? 0;
  return { gross, commission: Math.round((gross * staff.studio_share_pct) / 100) || 0, invoicedRent: sum("rent"), invoicedCommission: sum("commission"), paidOut: payouts?.n ?? 0 };
}

export async function createArtistInvoice(
  env: Env,
  input: { staffId: number; buyerName: string; buyerAddress: string | null; from: string; to: string; issueDate: string; dueDays: number; lines: ArtistLine[]; by: string },
): Promise<ArtistInvoice> {
  const [company, accounting] = await Promise.all([loadCompany(env), loadAccounting(env)]);
  const seller = { ...company, orgNumber: formatOrgNumber(company.orgNumber), vatRegistered: accounting.vatRegistered };
  const total = input.lines.reduce((n, l) => n + l.amount_ore, 0);
  const vat = input.lines.reduce((n, l) => n + l.vat_ore, 0);
  for (let attempt = 0; ; attempt++) {
    try {
      return (await env.DB.prepare(
        `INSERT INTO artist_invoices (number, staff_id, buyer_name, buyer_address, seller_json, period_from, period_to, issue_date, due_date, lines_json, total_ore, vat_ore, created_by)
         SELECT COALESCE(MAX(number), 0) + 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM artist_invoices RETURNING *`,
      )
        .bind(input.staffId, input.buyerName, input.buyerAddress, JSON.stringify(seller), input.from, input.to, input.issueDate, addDays(input.issueDate, input.dueDays), JSON.stringify(input.lines), total, vat, input.by)
        .first<ArtistInvoice>())!;
    } catch (error) {
      if (attempt < 3 && String(error).includes("UNIQUE")) continue;
      throw error;
    }
  }
}

export const artistInvoiceFilename = (inv: Pick<ArtistInvoice, "number" | "buyer_name">) => `faktura-artist-${inv.number}-${inv.buyer_name.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-")}.pdf`;

export function artistInvoicePdf(inv: ArtistInvoice): Uint8Array {
  const s = JSON.parse(inv.seller_json) as Company & { vatRegistered: boolean };
  const lines = JSON.parse(inv.lines_json) as ArtistLine[];
  const M = 56;
  const R = A4.width - M;
  const doc = new PdfDoc(M, () => `${s.name} · org.nr. ${s.orgNumber}${s.vatRegistered ? " MVA" : ""} · Faktura ${inv.number}`);
  doc.text({ x: M, text: s.name, size: 16, bold: true });
  doc.text({ x: R, text: "FAKTURA", size: 16, bold: true, align: "right" }, 20);
  const sellerLines = [s.address, `${s.postcode} ${s.city}`.trim(), s.orgNumber && `Org.nr. ${s.orgNumber}${s.vatRegistered ? " MVA" : ""}`, s.email].filter(Boolean) as string[];
  const meta: [string, string][] = [
    ["Fakturanr.", String(inv.number)],
    ["Fakturadato", inv.issue_date],
    ["Periode", `${inv.period_from} – ${inv.period_to}`],
    ["Forfall", inv.due_date],
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
  doc.text({ x: M, text: "Til", size: 9, gray: true }, 14);
  for (const t of [inv.buyer_name, ...(inv.buyer_address ?? "").split("\n")].filter(Boolean)) doc.text({ x: M, text: t, size: 11 }, 15);
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
  const vatByRate = [...new Set(lines.filter((l) => l.vat_pct).map((l) => l.vat_pct))].map((pct) => [pct, lines.filter((l) => l.vat_pct === pct).reduce((n, l) => n + l.vat_ore, 0)] as const);
  const totals: [string, number, boolean][] = [["Sum eks. mva", inv.total_ore - inv.vat_ore, false], ...vatByRate.map(([pct, v]) => [`Mva ${pct} %`, v, false] as [string, number, boolean]), ["Å betale", inv.total_ore, true]];
  for (const [label, amount, bold] of totals) {
    doc.text({ x: 400, text: label, size: bold ? 12 : 10, bold, align: "right" });
    doc.text({ x: R, text: formatOre(amount), size: bold ? 12 : 10, bold, align: "right" }, bold ? 20 : 15);
  }
  doc.gap(20);
  doc.text({ x: M, text: s.bankAccount ? `Betales til konto ${s.bankAccount} innen ${inv.due_date}. Merk betalingen med fakturanr. ${inv.number}.` : `Betales innen ${inv.due_date}.`, size: 10, bold: true }, 15);
  if (!s.vatRegistered) doc.text({ x: M, text: "Selger er ikke registrert i Merverdiavgiftsregisteret.", size: 10, gray: true }, 15);
  return doc.finish(`Faktura ${inv.number}`);
}

export async function emailArtistInvoice(env: Env, inv: ArtistInvoice, to: string): Promise<EmailResult> {
  const s = JSON.parse(inv.seller_json) as Company;
  const result = await sendEmail(env, {
    to,
    subject: `Faktura ${inv.number} fra ${s.name}`,
    text: [`Hei ${inv.buyer_name.split(" ")[0]},`, "", `Vedlagt er faktura ${inv.number} på ${formatOre(inv.total_ore)} for ${inv.period_from} – ${inv.period_to}, med forfall ${inv.due_date}.`, "", `Hilsen ${s.name}`].join("\n"),
    attachments: [{ filename: artistInvoiceFilename(inv), content: toBase64(artistInvoicePdf(inv)) }],
  });
  if (result.status === "sent") await env.DB.prepare("UPDATE artist_invoices SET emailed_at = ? WHERE id = ?").bind(new Date().toISOString(), inv.id).run();
  return result;
}
