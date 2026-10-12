import type { Context } from "hono";

import {
  artistInvoicePdf,
  artistInvoiceFilename,
  artistLines,
  artistPeriod,
  createArtistInvoice,
  DUE_DAYS,
  emailArtistInvoice,
  INVOICE_VAT,
  invoiceStatus,
  payoutDue,
  STATUS_LABELS,
  type ArtistInvoice,
  type ArtistLine,
} from "../lib/artist-money";
import { formatOre, parseKroner } from "../lib/report";
import { isDateString } from "../lib/time";
import { Layout } from "../views/layout";
import { Empty, FilterSelect, PageHead, PeriodNav, periodRange, SegTabs } from "../views/ui";
import { adminApp, audit, str, today, type AdminEnv } from "./admin-shared";

/** Oppgjør → Fakturaer and Utbetalinger. The guesses are described in lib/artist-money.ts (PLACEHOLDER-RESCAN). */
export const artistMoney = adminApp();

const isManager = (c: Context<AdminEnv>) => ["owner", "reception"].includes(c.get("user").role);
const msg = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });
const monthOf = (c: Context<AdminEnv>) => (isDateString(c.req.query("date") ?? "") ? `${c.req.query("date")!.slice(0, 7)}-01` : `${today().slice(0, 7)}-01`);

type StaffRow = { id: number; name: string; email: string | null; studio_share_pct: number; monthly_rent_ore: number; active: number };
const staffRows = async (c: Context<AdminEnv>) =>
  (await c.env.DB.prepare("SELECT id, name, email, studio_share_pct, monthly_rent_ore, active FROM staff WHERE role != 'reception' ORDER BY active DESC, id").all<StaffRow>()).results;

/** Studioandel | Fakturaer | Utbetalinger at the top of Oppgjør. */
export function SettlementTabs({ active }: { active: "commission" | "invoices" | "payouts" }) {
  const tabs = [
    { href: "/admin/settlements", label: "Studioandel" },
    { href: "/admin/settlements/invoices", label: "Fakturaer til artister" },
    { href: "/admin/settlements/payouts", label: "Utbetalinger" },
  ];
  return (
    <p class="noprint">
      <SegTabs tabs={tabs} active={tabs[["commission", "invoices", "payouts"].indexOf(active)].href} />
    </p>
  );
}

/** "Ubetalte fakturaer" card, like Linework's settlements dashboard. */
export async function unpaidSummary(c: Context<AdminEnv>) {
  const rows = (await c.env.DB.prepare("SELECT total_ore, due_date FROM artist_invoices WHERE status = 'open'").all<{ total_ore: number; due_date: string }>()).results;
  return { total: rows.reduce((n, r) => n + r.total_ore, 0), count: rows.length, overdue: rows.filter((r) => r.due_date < today()).length };
}

export function UnpaidCard({ u }: { u: Awaited<ReturnType<typeof unpaidSummary>> }) {
  return (
    <a class="card" href="/admin/settlements/invoices?status=open" style="margin:0;text-decoration:none;color:inherit">
      <div class="muted">Ubetalte fakturaer</div>
      <div class="big">{formatOre(u.total)}</div>
      <div class="muted">
        {u.count} fakturaer · {u.overdue} forfalt
      </div>
    </a>
  );
}

// ---------- Fakturaer ----------

artistMoney.get("/settlements/invoices", async (c) => {
  const user = c.get("user");
  const year = /^\d{4}$/.test(c.req.query("year") ?? "") ? c.req.query("year")! : c.req.query("year") === "all" ? "all" : today().slice(0, 4);
  const staffFilter = isManager(c) ? Number(c.req.query("staff")) || 0 : (user.staffId ?? -1);
  const status = c.req.query("status") ?? "";
  const [rows, staff, unpaid] = await Promise.all([
    c.env.DB.prepare(`SELECT * FROM artist_invoices WHERE (? = 'all' OR substr(issue_date, 1, 4) = ?) AND (? = 0 OR staff_id = ?) ORDER BY number DESC`)
      .bind(year, year, staffFilter, staffFilter)
      .all<ArtistInvoice>(),
    staffRows(c),
    unpaidSummary(c),
  ]);
  const t = today();
  const list = rows.results.filter((r) => !status || invoiceStatus(r, t) === status || (status === "open" && invoiceStatus(r, t) === "overdue"));
  const years = [...new Set([t.slice(0, 4), ...rows.results.map((r) => r.issue_date.slice(0, 4))])].sort().reverse();
  const month = `${t.slice(0, 7)}-01`;
  return c.html(
    <Layout title="Fakturaer til artister" path="/admin/settlements" user={user} {...msg(c)}>
      <PageHead title="Oppgjør" sub="Fakturaer til artistene for stolleie og studioandel.">
        {isManager(c) && (
          <a class="button" href="/admin/settlements/invoices/new">
            + Ny faktura
          </a>
        )}
      </PageHead>
      <SettlementTabs active="invoices" />
      <div class="grid" style="margin-bottom:1rem">
        <UnpaidCard u={unpaid} />
      </div>
      <form method="get" class="toolbar">
        <span class="filters" style="margin:0">
          <select name="year" onchange="this.form.submit()">
            {years.map((y) => (
              <option value={y} selected={y === year}>
                Utstedt {y}
              </option>
            ))}
            <option value="all" selected={year === "all"}>
              Utstedt når som helst
            </option>
          </select>
          {isManager(c) && <FilterSelect name="staff" value={staffFilter ? String(staffFilter) : ""} all="Alle artister" options={staff.map((s) => [String(s.id), s.name])} />}
          <FilterSelect name="status" value={status} all="Alle statuser" options={Object.entries(STATUS_LABELS)} />
        </span>
        {isManager(c) && (
          <button class="secondary small" formmethod="post" formaction={`/admin/settlements/invoices/rent?date=${month}`} style="margin-left:auto">
            Lag leiefakturaer for denne måneden
          </button>
        )}
      </form>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Fakturanr.</th>
              <th>Status</th>
              <th>Utstedt</th>
              <th>Forfall</th>
              <th class="num">Betalt</th>
              <th class="num">Beløp</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => {
              const st = invoiceStatus(r, t);
              return (
                <tr class={st === "void" ? "muted" : ""}>
                  <td>{r.buyer_name}</td>
                  <td>
                    <a href={`/admin/settlements/invoices/${r.id}/pdf`} target="_blank">
                      {r.number}
                    </a>
                  </td>
                  <td>
                    <span class={`pill${st === "paid" ? " confirmed" : st === "overdue" ? " requested" : ""}`}>{STATUS_LABELS[st]}</span>
                  </td>
                  <td>{r.issue_date}</td>
                  <td>{r.due_date}</td>
                  <td class="num">{formatOre(r.status === "paid" ? r.total_ore : 0)}</td>
                  <td class="num">{formatOre(r.total_ore)}</td>
                  <td class="num">
                    {isManager(c) && r.status !== "void" && (
                      <form method="post" action={`/admin/settlements/invoices/${r.id}`} style="display:flex;gap:.3rem;justify-content:flex-end">
                        {r.status === "open" && (
                          <button class="secondary small" name="action" value="paid">
                            Betalt
                          </button>
                        )}
                        <button class="secondary small" name="action" value="send" title={r.emailed_at ? `Sendt ${r.emailed_at.slice(0, 10)}` : ""}>
                          {r.emailed_at ? "Send igjen" : "Send"}
                        </button>
                        {r.status === "open" && (
                          <button class="secondary small" name="action" value="void" onclick="return confirm('Kreditere fakturaen? Den blir stående med status Kreditert.')">
                            Krediter
                          </button>
                        )}
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!list.length && <Empty icon="settle" text="Fant ingen fakturaer" />}
      </div>
      <div class="toolbar">
        <span class="muted">{formatOre(list.filter((r) => r.status !== "void").reduce((n, r) => n + r.total_ore, 0))} fakturert</span>
        <span class="muted">{formatOre(list.filter((r) => r.status === "paid").reduce((n, r) => n + r.total_ore, 0))} betalt</span>
      </div>
    </Layout>,
  );
});

artistMoney.get("/settlements/invoices/new", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/invoices");
  const staff = (await staffRows(c)).filter((s) => s.active);
  const chosen = staff.find((s) => s.id === Number(c.req.query("staff"))) ?? staff[0];
  const date = monthOf(c);
  const { from, to } = periodRange("month", date);
  const p = chosen ? await artistPeriod(c.env, chosen, from, to) : null;
  const rentLeft = chosen ? Math.max(0, chosen.monthly_rent_ore - (p?.invoicedRent ?? 0)) : 0;
  const commissionLeft = p ? Math.max(0, p.commission - p.invoicedCommission) : 0;
  const href = (staffId: number, d: string) => `/admin/settlements/invoices/new?staff=${staffId}&date=${d}`;
  return c.html(
    <Layout title="Ny faktura" path="/admin/settlements" user={c.get("user")} {...msg(c)}>
      <PageHead title="Ny faktura til artist" sub="Stolleie og studioandel for en måned. Beløpene er inkl. mva.">
        <a class="button secondary" href="/admin/settlements/invoices">
          Avbryt
        </a>
      </PageHead>
      {!chosen ? (
        <Empty icon="artists" text="Ingen aktive artister" />
      ) : (
        <form method="post" action="/admin/settlements/invoices" class="card">
          <div class="toolbar">
            <label style="margin:0">
              Artist
              <select name="staff_id" onchange={`location='/admin/settlements/invoices/new?date=${date}&staff='+this.value`}>
                {staff.map((s) => (
                  <option value={s.id} selected={s.id === chosen.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <PeriodNav unit="month" date={date} units={["month"]} href={(_u, d) => href(chosen.id, d)} />
            <input type="hidden" name="date" value={date} />
          </div>
          <p class="muted">
            {chosen.name}: omsetning {formatOre(p!.gross)}, studioandel {chosen.studio_share_pct} % = {formatOre(p!.commission)}, fast leie {formatOre(chosen.monthly_rent_ore)}. Allerede fakturert:{" "}
            {formatOre(p!.invoicedRent + p!.invoicedCommission)}.
          </p>
          <label class="check">
            <input type="checkbox" name="rent" value="1" checked={rentLeft > 0} />
            <span>Stolleie</span>
          </label>
          <div class="row" style="margin-left:1.6rem">
            <label>
              Beløp (kr)
              <input name="rent_amount" inputmode="decimal" value={String(rentLeft / 100)} />
            </label>
          </div>
          <label class="check">
            <input type="checkbox" name="commission" value="1" />
            <span>
              Studioandel <span class="muted">· bare hvis artisten tok betalt selv. Salg som gikk gjennom studioet trekkes fra utbetalingen i stedet.</span>
            </span>
          </label>
          <div class="row" style="margin-left:1.6rem">
            <label>
              Beløp (kr)
              <input name="commission_amount" inputmode="decimal" value={String(commissionLeft / 100)} />
            </label>
          </div>
          <div class="row">
            <label>
              Annen linje (valgfritt)
              <input name="other_text" maxlength={80} placeholder="Rekvisita" />
            </label>
            <label>
              Beløp (kr)
              <input name="other_amount" inputmode="decimal" />
            </label>
          </div>
          <div class="row">
            <label>
              Mva
              <select name="vat_pct">
                {INVOICE_VAT.map((v) => (
                  <option value={v} selected={v === 25}>
                    {v} %
                  </option>
                ))}
              </select>
            </label>
            <label>
              Betalingsfrist
              <select name="due_days">
                {DUE_DAYS.map((d) => (
                  <option value={d} selected={d === 14}>
                    {d} dager
                  </option>
                ))}
              </select>
            </label>
            <label>
              Navn på fakturaen
              <input name="buyer_name" required value={chosen.name} maxlength={120} />
            </label>
          </div>
          <label>
            Adresse (eller artistens firma og org.nr.)
            <textarea name="buyer_address" rows={2} maxlength={300} />
          </label>
          <button>Lag faktura</button>
        </form>
      )}
    </Layout>,
  );
});

const monthLabel = (from: string) => periodRange("month", from).label.toLowerCase();

artistMoney.post("/settlements/invoices", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/invoices");
  const body = await c.req.parseBody();
  const staffId = Number(str(body, "staff_id"));
  const date = isDateString(str(body, "date")) ? str(body, "date") : `${today().slice(0, 7)}-01`;
  const { from, to } = periodRange("month", date);
  const vat = Number(str(body, "vat_pct"));
  const due = Number(str(body, "due_days"));
  const back = `/admin/settlements/invoices/new?staff=${staffId}&date=${date}`;
  const amount = (k: string) => parseKroner(str(body, k)) ?? 0;
  const items: { text: string; kind: ArtistLine["kind"]; amount_ore: number }[] = [];
  if (str(body, "rent") === "1") items.push({ text: `Stolleie ${monthLabel(from)}`, kind: "rent", amount_ore: amount("rent_amount") });
  if (str(body, "commission") === "1") items.push({ text: `Studioandel ${monthLabel(from)}`, kind: "commission", amount_ore: amount("commission_amount") });
  if (str(body, "other_text")) items.push({ text: str(body, "other_text").slice(0, 80), kind: "other", amount_ore: amount("other_amount") });
  const lines = artistLines(items, INVOICE_VAT.includes(vat as never) ? vat : 25);
  const buyer = str(body, "buyer_name").slice(0, 120);
  if (!staffId || !lines.length || !buyer) return c.redirect(`${back}&error=Velg+minst+én+linje+med+beløp`);
  const inv = await createArtistInvoice(c.env, {
    staffId,
    buyerName: buyer,
    buyerAddress: str(body, "buyer_address").slice(0, 300) || null,
    from,
    to,
    issueDate: today(),
    dueDays: DUE_DAYS.includes(due as never) ? due : 14,
    lines,
    by: c.get("user").email,
  });
  await audit(c.env, c.get("user"), "create", "artist_invoice", inv.id, { number: inv.number, total: inv.total_ore });
  return c.redirect(`/admin/settlements/invoices?ok=${encodeURIComponent(`Faktura ${inv.number} laget`)}`);
});

// Linework's fixed rent is invoiced on a set day each month; here it's one button per month.
artistMoney.post("/settlements/invoices/rent", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/invoices");
  const { from, to } = periodRange("month", monthOf(c));
  let made = 0;
  const renters = (await staffRows(c)).filter((s) => s.active && s.monthly_rent_ore > 0);
  if (!renters.length) return c.redirect("/admin/settlements/invoices?error=Ingen+artister+har+fast+stolleie+(settes+på+hver+artist)");
  for (const s of renters) {
    const p = await artistPeriod(c.env, s, from, to);
    const left = s.monthly_rent_ore - p.invoicedRent;
    if (left <= 0) continue;
    await createArtistInvoice(c.env, {
      staffId: s.id,
      buyerName: s.name,
      buyerAddress: null,
      from,
      to,
      issueDate: today(),
      dueDays: 14,
      lines: artistLines([{ text: `Stolleie ${monthLabel(from)}`, kind: "rent", amount_ore: left }], 25),
      by: c.get("user").email,
    });
    made++;
  }
  return c.redirect(`/admin/settlements/invoices?ok=${encodeURIComponent(made ? `${made} leiefakturaer laget` : "Leien for måneden er allerede fakturert")}`);
});

artistMoney.get("/settlements/invoices/:id/pdf", async (c) => {
  const inv = await c.env.DB.prepare("SELECT * FROM artist_invoices WHERE id = ?").bind(Number(c.req.param("id"))).first<ArtistInvoice>();
  if (!inv || (!isManager(c) && inv.staff_id !== c.get("user").staffId)) return c.notFound();
  return new Response(artistInvoicePdf(inv), { headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${artistInvoiceFilename(inv)}"` } });
});

artistMoney.post("/settlements/invoices/:id", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/invoices");
  const id = Number(c.req.param("id"));
  const action = str(await c.req.parseBody(), "action");
  const inv = await c.env.DB.prepare("SELECT * FROM artist_invoices WHERE id = ?").bind(id).first<ArtistInvoice>();
  if (!inv) return c.redirect("/admin/settlements/invoices");
  if (action === "paid") await c.env.DB.prepare("UPDATE artist_invoices SET status = 'paid', paid_at = ? WHERE id = ? AND status = 'open'").bind(new Date().toISOString(), id).run();
  if (action === "void") await c.env.DB.prepare("UPDATE artist_invoices SET status = 'void' WHERE id = ? AND status = 'open'").bind(id).run();
  if (action === "send") {
    const email = (await c.env.DB.prepare("SELECT email FROM staff WHERE id = ?").bind(inv.staff_id).first<{ email: string | null }>())?.email;
    if (!email) return c.redirect("/admin/settlements/invoices?error=Artisten+har+ingen+e-post");
    const r = await emailArtistInvoice(c.env, inv, email);
    if (r.status !== "sent") return c.redirect(`/admin/settlements/invoices?error=${encodeURIComponent(`Ble ikke sendt: ${r.error ?? r.status}`)}`);
  }
  await audit(c.env, c.get("user"), action, "artist_invoice", id);
  return c.redirect(`/admin/settlements/invoices?ok=${action === "send" ? "Sendt" : "Lagret"}`);
});

// ---------- Utbetalinger ----------

artistMoney.get("/settlements/payouts", async (c) => {
  const user = c.get("user");
  const date = monthOf(c);
  const { from, to } = periodRange("month", date);
  const showRent = user.features?.rent !== false;
  const staff = (await staffRows(c)).filter((s) => isManager(c) || s.id === user.staffId);
  const lines = await Promise.all(
    staff.map(async (s) => {
      const p = await artistPeriod(c.env, s, from, to);
      return { s, p, due: payoutDue(p, 1, showRent ? s.monthly_rent_ore : 0) };
    }),
  );
  const visible = lines.filter((l) => l.p.gross || l.p.paidOut || l.s.active);
  const history = (
    await c.env.DB.prepare(
      `SELECT ap.*, s.name FROM artist_payouts ap JOIN staff s ON s.id = ap.staff_id WHERE ap.period_from <= ? AND ap.period_to >= ? ${isManager(c) ? "" : "AND ap.staff_id = ?"} ORDER BY ap.paid_on DESC, ap.id DESC`,
    )
      .bind(to, from, ...(isManager(c) ? [] : [user.staffId ?? -1]))
      .all<{ id: number; name: string; amount_ore: number; paid_on: string; note: string | null; created_by: string }>()
  ).results;
  return c.html(
    <Layout title="Utbetalinger" path="/admin/settlements" user={user} {...msg(c)}>
      <PageHead title="Oppgjør" sub="Det studioet skal betale ut til hver artist for salg som gikk gjennom studioet." />
      <SettlementTabs active="payouts" />
      <div class="toolbar">
        <PeriodNav unit="month" date={date} units={["month"]} href={(_u, d) => `/admin/settlements/payouts?date=${d}`} />
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th class="num">Omsetning</th>
              <th class="num">Studioandel</th>
              {showRent && <th class="num">Leie trukket</th>}
              <th class="num">Utbetalt</th>
              <th class="num">Gjenstår</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map(({ s, p, due }) => (
              <tr>
                <td>{s.name}</td>
                <td class="num">{formatOre(p.gross)}</td>
                <td class="num">{formatOre(p.commission)}</td>
                {showRent && <td class="num">{formatOre(Math.max(0, s.monthly_rent_ore - p.invoicedRent))}</td>}
                <td class="num">{formatOre(p.paidOut)}</td>
                <td class="num">
                  <strong>{formatOre(due)}</strong>
                </td>
                <td class="num">
                  {isManager(c) && due > 0 && (
                    <form method="post" action="/admin/settlements/payouts" style="display:flex;gap:.3rem;justify-content:flex-end">
                      <input type="hidden" name="staff_id" value={String(s.id)} />
                      <input type="hidden" name="date" value={date} />
                      <input name="amount" inputmode="decimal" value={String(due / 100)} style="width:7rem" aria-label="Beløp" />
                      <button class="secondary small">Registrer utbetaling</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visible.length && <Empty icon="artists" text="Ingen artister" />}
      </div>
      <p class="muted" style="font-size:.88rem">
        Betal ut fra nettbanken som vanlig, og registrer beløpet her. Leie som er fakturert for seg trekkes ikke fra en gang til.
      </p>
      {history.length > 0 && (
        <>
          <h2>Registrert denne måneden</h2>
          <div class="list">
            <table>
              <tbody>
                {history.map((h) => (
                  <tr>
                    <td>{h.paid_on}</td>
                    <td>{h.name}</td>
                    <td class="muted">{h.note}</td>
                    <td class="num">{formatOre(h.amount_ore)}</td>
                    <td class="num">
                      {isManager(c) && (
                        <form method="post" action={`/admin/settlements/payouts/${h.id}/delete?date=${date}`}>
                          <button class="secondary small" onclick="return confirm('Slette registreringen?')">
                            Slett
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>,
  );
});

artistMoney.post("/settlements/payouts", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/payouts");
  const body = await c.req.parseBody();
  const date = isDateString(str(body, "date")) ? str(body, "date") : `${today().slice(0, 7)}-01`;
  const { from, to } = periodRange("month", date);
  const amount = parseKroner(str(body, "amount"));
  const staffId = Number(str(body, "staff_id"));
  if (!staffId || !amount || amount <= 0) return c.redirect(`/admin/settlements/payouts?date=${date}&error=Sjekk+beløpet`);
  const row = await c.env.DB.prepare("INSERT INTO artist_payouts (staff_id, period_from, period_to, amount_ore, paid_on, note, created_by) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id")
    .bind(staffId, from, to, amount, today(), `Utbetaling ${monthLabel(from)}`, c.get("user").email)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "artist_payout", row!.id, { amount });
  return c.redirect(`/admin/settlements/payouts?date=${date}&ok=Utbetaling+registrert`);
});

artistMoney.post("/settlements/payouts/:id/delete", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settlements/payouts");
  await c.env.DB.prepare("DELETE FROM artist_payouts WHERE id = ?").bind(Number(c.req.param("id"))).run();
  await audit(c.env, c.get("user"), "delete", "artist_payout", Number(c.req.param("id")));
  return c.redirect(`/admin/settlements/payouts?date=${monthOf(c)}&ok=Slettet`);
});
