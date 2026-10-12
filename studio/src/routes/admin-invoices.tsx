import type { Context } from "hono";

import {
  buyerComplete,
  emailInvoice,
  findOrCreateClient,
  invoiceFilename,
  invoicePdf,
  invoicesSince,
  invoiceTitle,
  issueInvoice,
  loadInvoice,
  salesWithoutInvoice,
  saveClientAddress,
  sweepInvoices,
  type Buyer,
  type Invoice,
} from "../lib/invoices";
import { formatOre } from "../lib/report";
import { isDateString } from "../lib/time";
import { Layout } from "../views/layout";
import { Empty, PageHead, PeriodNav, periodRange, SegTabs, type PeriodUnit } from "../views/ui";
import { adminApp, audit, KIND_LABELS, METHOD_LABELS, str, today, type AdminEnv } from "./admin-shared";

/**
 * Fakturaer (only in invoice mode): every issued invoice and credit note, and the sales still
 * waiting for one because the buyer's address is missing.
 */
export const invoices = adminApp();

const flash = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });

/** Name and address fields for the invoice, used on the sale and gift card forms in invoice mode. */
export function BuyerFields(props: { buyer?: Partial<Buyer & { phone: string | null }> | null; phone?: boolean }) {
  const b = props.buyer ?? {};
  return (
    <fieldset class="buyer">
      <legend>Kunde (står på fakturaen)</legend>
      <div class="row">
        <label>
          Navn
          <input name="buyer_name" value={b.name ?? ""} required autocomplete="off" />
        </label>
        <label>
          E-post (fakturaen sendes hit)
          <input name="buyer_email" type="email" value={b.email ?? ""} autocomplete="off" />
        </label>
        {props.phone && (
          <label>
            Telefon
            <input name="buyer_phone" type="tel" value={b.phone ?? ""} autocomplete="off" />
          </label>
        )}
      </div>
      <div class="row">
        <label>
          Adresse
          <input name="buyer_address" value={b.address ?? ""} required autocomplete="off" />
        </label>
        <label>
          Postnummer
          <input name="buyer_postcode" value={b.postcode ?? ""} required inputmode="numeric" maxlength={4} autocomplete="off" />
        </label>
        <label>
          Sted
          <input name="buyer_city" value={b.city ?? ""} required autocomplete="off" />
        </label>
      </div>
    </fieldset>
  );
}

export function buyerFrom(body: Record<string, unknown>): Buyer & { phone: string | null } {
  return {
    name: str(body, "buyer_name"),
    address: str(body, "buyer_address"),
    postcode: str(body, "buyer_postcode"),
    city: str(body, "buyer_city"),
    email: str(body, "buyer_email") || null,
    phone: str(body, "buyer_phone") || null,
  };
}

/**
 * Invoice mode, after a sale is saved: puts the buyer on the payment (the booking's client, or a
 * client found or created from the form) and issues the invoice. Returns a line for the flash message.
 */
export async function invoiceAfterSale(c: Context<AdminEnv>, paymentId: number, body: Record<string, unknown>): Promise<string> {
  const buyer = buyerFrom(body);
  const p = await c.env.DB.prepare("SELECT p.booking_id, b.client_id FROM payments p LEFT JOIN bookings b ON b.id = p.booking_id WHERE p.id = ?")
    .bind(paymentId)
    .first<{ booking_id: number | null; client_id: number | null }>();
  if (buyerComplete(buyer)) {
    if (p?.client_id) await saveClientAddress(c.env, p.client_id, buyer);
    else await c.env.DB.prepare("UPDATE payments SET client_id = ? WHERE id = ?").bind(await findOrCreateClient(c.env, buyer), paymentId).run();
  }
  const r = await issueInvoice(c.env, paymentId, c.get("user").email);
  if (!r.ok) return `, men fakturaen ble ikke laget: ${r.message}`;
  const sent = r.invoice.email_status === "sent" ? " og sendt på e-post" : "";
  return `, ${invoiceTitle(r.invoice).toLowerCase()} laget${sent}`;
}

const STATUS: Record<string, string> = { sent: "Sendt", failed: "Feilet", skipped: "Ikke sendt" };

invoices.get("/invoices", async (c) => {
  const unit: PeriodUnit = (["day", "week", "month", "year"] as const).find((u) => u === c.req.query("unit")) ?? "month";
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const { from, to } = periodRange(unit, date);
  const [rows, missing, since] = await Promise.all([
    c.env.DB.prepare("SELECT * FROM invoices WHERE issue_date BETWEEN ? AND ? ORDER BY number DESC").bind(from, to).all<Invoice>(),
    salesWithoutInvoice(c.env),
    invoicesSince(c.env),
  ]);
  const list = rows.results;
  const total = list.reduce((n, i) => n + i.total_ore, 0);
  const vat = list.reduce((n, i) => n + i.vat_ore, 0);
  return c.html(
    <Layout title="Fakturaer" path="/admin/invoices" user={c.get("user")} {...flash(c)}>
      <PageHead title="Fakturaer" sub="En nummerert faktura for hvert salg, med kundens navn og adresse." />
      <p>
        <SegTabs
          tabs={[
            { href: "/admin/invoices", label: "Fakturaer" },
            { href: "/admin/invoices/missing", label: "Uten faktura", count: missing.length },
          ]}
          active="/admin/invoices"
        />
      </p>
      <PeriodNav unit={unit} date={date} units={["day", "week", "month", "year"]} href={(u, d) => `/admin/invoices?unit=${u}&date=${d}`} />
      {list.length === 0 ? (
        <Empty icon="ledger" text="Ingen fakturaer i perioden">
          {since && <p class="muted">Fakturamodus er på siden {since.slice(0, 10)}.</p>}
        </Empty>
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Dato</th>
                <th>Kunde</th>
                <th>Betalt med</th>
                <th>E-post</th>
                <th class="num">Mva</th>
                <th class="num">Beløp</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr>
                  <td>
                    <a href={`/admin/invoices/${i.id}/pdf`} target="_blank">
                      {i.kind === "credit_note" ? `Kreditnota ${i.number}` : i.number}
                    </a>
                  </td>
                  <td>{i.issue_date}</td>
                  <td>{i.buyer_name}</td>
                  <td>{METHOD_LABELS[i.method] ?? i.method}</td>
                  <td>
                    {i.email_status ? STATUS[i.email_status] : "–"}
                    <form method="post" action={`/admin/invoices/${i.id}/send`} style="display:inline;margin-left:.5rem">
                      <button class="small secondary" disabled={!i.buyer_email} title={i.buyer_email ?? "Ingen e-post"}>
                        Send
                      </button>
                    </form>
                  </td>
                  <td class="num">{formatOre(i.vat_ore)}</td>
                  <td class="num">{formatOre(i.total_ore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div class="sumbar">
        <span>
          {list.length} {list.length === 1 ? "faktura" : "fakturaer"}
        </span>
        <span>Mva {formatOre(vat)}</span>
        <span>
          <strong>{formatOre(total)}</strong>
        </span>
      </div>
    </Layout>,
  );
});

invoices.get("/invoices/missing", async (c) => {
  const missing = await salesWithoutInvoice(c.env);
  return c.html(
    <Layout title="Uten faktura" path="/admin/invoices" user={c.get("user")} {...flash(c)}>
      <PageHead title="Fakturaer" sub="Salg som venter på faktura, oftest fordi kundens adresse mangler.">
        <form method="post" action="/admin/invoices/sweep">
          <button class="secondary">Lag fakturaer som er klare</button>
        </form>
      </PageHead>
      <p>
        <SegTabs
          tabs={[
            { href: "/admin/invoices", label: "Fakturaer" },
            { href: "/admin/invoices/missing", label: "Uten faktura", count: missing.length },
          ]}
          active="/admin/invoices/missing"
        />
      </p>
      {missing.length === 0 ? (
        <Empty icon="ledger" text="Alle salg har faktura" />
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Salg</th>
                <th>Kunde</th>
                <th>Betalt med</th>
                <th class="num">Beløp</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {missing.map((p) => (
                <tr>
                  <td>{p.business_date}</td>
                  <td>{KIND_LABELS[p.kind] ?? p.kind}</td>
                  <td>{p.name ?? <span class="muted">Ukjent</span>}</td>
                  <td>{METHOD_LABELS[p.method] ?? p.method}</td>
                  <td class="num">{formatOre(p.amount_ore)}</td>
                  <td class="num">
                    <a href={`/admin/invoices/new/${p.id}`} data-drawer>
                      Legg til kunde
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>,
  );
});

// Add the buyer to a sale that has none (a Zettle import, an online gift card) and issue its invoice.
invoices.get("/invoices/new/:paymentId", async (c) => {
  const id = Number(c.req.param("paymentId"));
  const p = await c.env.DB.prepare(
    `SELECT p.id, p.kind, p.amount_ore, p.business_date, cl.name, cl.email, cl.phone, cl.address, cl.postcode, cl.city
     FROM payments p LEFT JOIN bookings b ON b.id = p.booking_id LEFT JOIN clients cl ON cl.id = COALESCE(p.client_id, b.client_id) WHERE p.id = ?`,
  )
    .bind(id)
    .first<{ id: number; kind: string; amount_ore: number; business_date: string } & Partial<Buyer & { phone: string | null }>>();
  if (!p) return c.notFound();
  return c.html(
    <Layout title="Faktura" path="/admin/invoices" user={c.get("user")} {...flash(c)}>
      <h1>Faktura for salget</h1>
      <p class="muted">
        {KIND_LABELS[p.kind] ?? p.kind} {p.business_date}, {formatOre(p.amount_ore)}. Adressen lagres på kunden.
      </p>
      <form method="post" action={`/admin/invoices/new/${p.id}`} class="card">
        <BuyerFields buyer={p} phone />
        <button>Lag faktura</button>
      </form>
    </Layout>,
  );
});

invoices.post("/invoices/new/:paymentId", async (c) => {
  const id = Number(c.req.param("paymentId"));
  const body = await c.req.parseBody();
  if (!buyerComplete(buyerFrom(body))) return c.redirect(`/admin/invoices/new/${id}?error=Fyll+inn+navn+og+adresse`);
  const line = await invoiceAfterSale(c, id, body);
  await audit(c.env, c.get("user"), "create", "invoice", id);
  return c.redirect(`/admin/invoices/missing?ok=${encodeURIComponent(`Lagret${line}`)}`);
});

invoices.post("/invoices/sweep", async (c) => {
  const r = await sweepInvoices(c.env, c.get("user").email);
  return c.redirect(`/admin/invoices/missing?ok=${encodeURIComponent(`${r.issued} fakturaer laget, ${r.waiting} venter på kunde`)}`);
});

invoices.get("/invoices/:id/pdf", async (c) => {
  const inv = await loadInvoice(c.env, Number(c.req.param("id")));
  if (!inv) return c.notFound();
  return new Response(invoicePdf(inv), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${invoiceFilename(inv)}"`, "Cache-Control": "no-store" },
  });
});

invoices.post("/invoices/:id/send", async (c) => {
  const inv = await loadInvoice(c.env, Number(c.req.param("id")));
  if (!inv) return c.notFound();
  const r = await emailInvoice(c.env, inv);
  await audit(c.env, c.get("user"), "send", "invoice", inv.id, { status: r.status });
  const back = c.req.header("Referer")?.includes("/admin/") ? new URL(c.req.header("Referer")!).pathname : "/admin/invoices";
  return c.redirect(r.status === "sent" ? `${back}?ok=Faktura+${inv.number}+sendt` : `${back}?error=${encodeURIComponent(`Ikke sendt: ${r.error ?? r.status}`)}`);
});
