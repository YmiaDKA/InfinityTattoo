import { formatOre } from "../lib/report";
import { businessDate, localTime } from "../lib/time";
import { Icon, Layout } from "../views/layout";
import { Empty, FilterSelect, Tabs } from "../views/ui";
import { adminApp, audit, METHOD_LABELS, str } from "./admin-shared";

/** Kunder with Linework's three tabs: Kunder, Depositum and Skjema. */
export const clients = adminApp();

const TABS = [
  { href: "/admin/clients", label: "Kunder" },
  { href: "/admin/clients/deposits", label: "Depositum" },
  { href: "/admin/clients/forms", label: "Skjema" },
];

const AddClient = () => (
  <a class="button secondary" href="/admin/clients/new" data-drawer>
    + Legg til kunde
  </a>
);

const shortDate = (iso: string | null) => (iso ? businessDate(iso).split("-").reverse().join(".") : "–");

clients.get("/clients", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  const sort = c.req.query("sort") === "name" ? "c.name COLLATE NOCASE" : "c.id DESC";
  const now = new Date().toISOString();
  const rows = (
    await c.env.DB.prepare(
      `SELECT c.id, c.name, c.phone, c.email, c.created_at,
         (SELECT MAX(b.starts_at) FROM bookings b WHERE b.client_id = c.id AND b.starts_at <= ?1 AND b.status IN ('confirmed','completed')) AS last_seen,
         (SELECT GROUP_CONCAT(DISTINCT s.name) FROM bookings b JOIN staff s ON s.id = b.staff_id WHERE b.client_id = c.id AND b.status IN ('confirmed','completed')) AS artists,
         (SELECT COALESCE(SUM(p.amount_ore), 0) FROM payments p JOIN bookings b ON b.id = p.booking_id WHERE b.client_id = c.id) AS spent
       FROM clients c
       WHERE ?2 = '' OR c.name LIKE ?3 OR c.phone LIKE ?3 OR c.email LIKE ?3
       ORDER BY ${sort} LIMIT 200`,
    )
      .bind(now, q, `%${q}%`)
      .all<{
        id: number;
        name: string;
        phone: string | null;
        email: string | null;
        created_at: string;
        last_seen: string | null;
        artists: string | null;
        spent: number;
      }>()
  ).results;
  const sortLink = (key: string, label: string) => (
    <a href={`/admin/clients?sort=${key}${q ? `&q=${encodeURIComponent(q)}` : ""}`} style="text-decoration:none">
      {label}
      {(key === "name") === (c.req.query("sort") === "name") ? " ↓" : ""}
    </a>
  );
  return c.html(
    <Layout title="Kunder" path="/admin/clients" user={c.get("user")} flash={c.req.query("ok")}>
      <Tabs tabs={TABS} active="/admin/clients">
        <AddClient />
      </Tabs>
      <form method="get" class="toolbar">
        <label class="search">
          <Icon name="search" size={16} />
          <input name="q" value={q} placeholder="Søk" type="search" />
        </label>
      </form>
      {rows.length === 0 && !q ? (
        <Empty icon="clients" text="Ingen kunder lagt til ennå">
          <AddClient />
        </Empty>
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>{sortLink("name", "Navn")}</th>
                <th>Telefon</th>
                <th>E-post</th>
                <th>{sortLink("created", "Lagt til")}</th>
                <th>Sist sett</th>
                <th>Artister besøkt</th>
                <th class="num">Brukt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr>
                  <td>
                    <a href={`/admin/clients/${r.id}`}>{r.name}</a>
                  </td>
                  <td>{r.phone}</td>
                  <td>{r.email}</td>
                  <td>{shortDate(r.created_at)}</td>
                  <td>{shortDate(r.last_seen)}</td>
                  <td>{r.artists?.split(",").join(", ")}</td>
                  <td class="num">{formatOre(r.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p class="muted" style="padding:1rem 2rem">
              Ingen treff.
            </p>
          )}
        </div>
      )}
    </Layout>,
  );
});

clients.get("/clients/new", (c) =>
  c.html(
    <Layout title="Legg til kunde" path="/admin/clients" user={c.get("user")} error={c.req.query("error")}>
      <h1>Legg til kunde</h1>
      <form method="post" action="/admin/clients" style="max-width:28rem">
        <label>
          Navn
          <input name="name" required placeholder="Kundens navn" />
        </label>
        <label>
          E-post
          <input name="email" type="email" placeholder="Kundens e-post" />
        </label>
        <label>
          Telefon
          <input name="phone" type="tel" placeholder="+47 900 00 000" />
        </label>
        <button>Opprett kunde</button>
      </form>
    </Layout>,
  ),
);

clients.post("/clients", async (c) => {
  const body = await c.req.parseBody();
  const name = str(body, "name");
  if (!name) return c.redirect("/admin/clients/new?error=Skriv+inn+navn");
  const row = await c.env.DB.prepare("INSERT INTO clients (name, email, phone) VALUES (?, ?, ?) RETURNING id")
    .bind(name, str(body, "email").toLowerCase() || null, str(body, "phone") || null)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "client", row!.id);
  return c.redirect(`/admin/clients/${row!.id}?ok=Kunde+opprettet`);
});

// Linework's deposit statuses, worked out from the booking and its payments.
const DEPOSIT_STATUS: Record<string, string> = { pending: "Venter", valid: "Gyldig", redeemed: "Brukt", forfeited: "Tapt", refunded: "Refundert" };

clients.get("/clients/deposits", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  const status = c.req.query("status") ?? "";
  const rows = (
    await c.env.DB.prepare(
      `SELECT b.id, b.status, b.deposit_ore, b.created_at, c.name AS client_name, s.name AS staff_name,
         (SELECT COALESCE(SUM(amount_ore), 0) FROM payments p WHERE p.booking_id = b.id AND p.kind = 'deposit') AS paid,
         (SELECT COUNT(*) FROM payments p WHERE p.booking_id = b.id AND p.kind = 'refund') AS refunds,
         (SELECT method FROM payments p WHERE p.booking_id = b.id AND p.kind = 'deposit' ORDER BY p.id DESC LIMIT 1) AS method,
         (SELECT MAX(paid_at) FROM payments p WHERE p.booking_id = b.id) AS updated
       FROM bookings b JOIN clients c ON c.id = b.client_id LEFT JOIN staff s ON s.id = b.staff_id
       WHERE b.deposit_ore > 0 AND (?1 = '' OR c.name LIKE ?2)
       ORDER BY b.id DESC LIMIT 300`,
    )
      .bind(q, `%${q}%`)
      .all<{
        id: number;
        status: string;
        deposit_ore: number;
        created_at: string;
        client_name: string;
        staff_name: string | null;
        paid: number;
        refunds: number;
        method: string | null;
        updated: string | null;
      }>()
  ).results
    .map((r) => {
      const st =
        r.paid <= 0
          ? r.status === "cancelled" || r.status === "no_show"
            ? null
            : "pending"
          : r.refunds > 0
            ? "refunded"
            : r.status === "completed"
              ? "redeemed"
              : r.status === "cancelled" || r.status === "no_show"
                ? "forfeited"
                : "valid";
      return { ...r, st };
    })
    .filter((r) => r.st && (!status || r.st === status));
  const active = rows.filter((r) => r.st === "valid");
  return c.html(
    <Layout title="Depositum" path="/admin/clients" user={c.get("user")}>
      <Tabs tabs={TABS} active="/admin/clients/deposits">
        <AddClient />
      </Tabs>
      <form method="get" class="toolbar">
        <label class="search">
          <Icon name="search" size={16} />
          <input name="q" value={q} placeholder="Søk" type="search" />
        </label>
        <span class="filters" style="margin:0">
          <FilterSelect name="status" value={status} all="Alle statuser" options={Object.entries(DEPOSIT_STATUS)} />
        </span>
      </form>
      {rows.length === 0 ? (
        <Empty icon="deposit" text="Ingen depositum ennå" />
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Kunde</th>
                <th>Artist</th>
                <th>Betalingsmåte</th>
                <th>Status</th>
                <th>Sist oppdatert</th>
                <th class="num">Beløp</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr>
                  <td>
                    <a href={`/admin/bookings/${r.id}`}>{shortDate(r.created_at)}</a>
                  </td>
                  <td>{r.client_name}</td>
                  <td>{r.staff_name ?? "–"}</td>
                  <td>{r.method ? METHOD_LABELS[r.method] : "–"}</td>
                  <td>
                    <span class={`pill ${r.st === "valid" ? "confirmed" : r.st === "pending" ? "requested" : "cancelled"}`}>{DEPOSIT_STATUS[r.st!]}</span>
                  </td>
                  <td>{r.updated ? `${shortDate(r.updated)} ${localTime(r.updated)}` : "–"}</td>
                  <td class="num">{formatOre(r.paid > 0 ? r.paid : r.deposit_ore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div class="sumbar">
        <span>
          <strong>{active.length}</strong> aktive depositum
        </span>
        <span>
          <strong>{formatOre(active.reduce((s, r) => s + r.paid, 0))}</strong>
        </span>
      </div>
    </Layout>,
  );
});

clients.get("/clients/forms", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  const status = c.req.query("status") ?? "";
  const rows = (
    await c.env.DB.prepare(
      `SELECT b.id, b.created_at, b.status, c.name AS client_name, s.name AS staff_name, sv.kind,
         (SELECT MAX(signed_at) FROM consents k WHERE k.booking_id = b.id) AS signed_at
       FROM bookings b JOIN clients c ON c.id = b.client_id JOIN services sv ON sv.id = b.service_id LEFT JOIN staff s ON s.id = b.staff_id
       WHERE sv.needs_consent = 1 AND b.status IN ('confirmed','completed') AND (?1 = '' OR c.name LIKE ?2)
       ORDER BY b.id DESC LIMIT 300`,
    )
      .bind(q, `%${q}%`)
      .all<{ id: number; created_at: string; status: string; client_name: string; staff_name: string | null; kind: string; signed_at: string | null }>()
  ).results.filter((r) => !status || (status === "done") === Boolean(r.signed_at));
  return c.html(
    <Layout title="Skjema" path="/admin/clients" user={c.get("user")}>
      <Tabs tabs={TABS} active="/admin/clients/forms">
        <AddClient />
      </Tabs>
      <form method="get" class="toolbar">
        <label class="search">
          <Icon name="search" size={16} />
          <input name="q" value={q} placeholder="Søk" type="search" />
        </label>
        <span class="filters" style="margin:0">
          <FilterSelect
            name="status"
            value={status}
            all="Alle statuser"
            options={[
              ["done", "Fullført"],
              ["pending", "Venter"],
            ]}
          />
        </span>
      </form>
      {rows.length === 0 ? (
        <Empty icon="forms" text="Ingen skjema å vise" />
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Opprettet</th>
                <th>Status</th>
                <th>Fullført</th>
                <th>Kundenavn</th>
                <th>Artist</th>
                <th>Skjema</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr>
                  <td>
                    <a href={`/admin/bookings/${r.id}`}>{shortDate(r.created_at)}</a>
                  </td>
                  <td>
                    <span class={`pill ${r.signed_at ? "confirmed" : "requested"}`}>{r.signed_at ? "Fullført" : "Venter"}</span>
                  </td>
                  <td>{r.signed_at ? `${shortDate(r.signed_at)} ${localTime(r.signed_at)}` : "–"}</td>
                  <td>{r.client_name}</td>
                  <td>{r.staff_name ?? "–"}</td>
                  <td>{r.kind === "tattoo" ? "Egenerklæring tatovering" : "Egenerklæring piercing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>,
  );
});
