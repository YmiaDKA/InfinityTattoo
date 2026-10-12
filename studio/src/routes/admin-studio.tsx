import type { Context } from "hono";

import { isDateString, osloToUtc } from "../lib/time";
import { Layout } from "../views/layout";
import { adminApp, audit, str, type AdminEnv } from "./admin-shared";

/** Ink register and multi-session projects. */
export const studio = adminApp();

export type Ink = {
  id: number;
  brand: string;
  name: string;
  batch: string | null;
  expires_on: string | null;
  supplier: string | null;
  in_stock: number;
  active: number;
};

const inkLabel = (i: Pick<Ink, "brand" | "name" | "batch">) => `${i.brand} ${i.name}${i.batch ? ` (batch ${i.batch})` : ""}`;

// ---------- Booking pieces rendered on the booking page ----------

export async function bookingStudioData(env: AdminEnv["Bindings"], bookingId: number, projectId: number, clientId: number) {
  const [sessions, used, inks, noShows] = await Promise.all([
    env.DB.prepare(
      `SELECT id, status, starts_at FROM bookings WHERE (id = ? OR project_id = ?) ORDER BY starts_at IS NULL, starts_at, id`,
    )
      .bind(projectId, projectId)
      .all<{ id: number; status: string; starts_at: string | null }>(),
    env.DB.prepare(
      `SELECT bi.id, i.brand, i.name, i.batch, i.expires_on FROM booking_inks bi JOIN inks i ON i.id = bi.ink_id WHERE bi.booking_id = ? ORDER BY bi.id`,
    )
      .bind(bookingId)
      .all<{ id: number; brand: string; name: string; batch: string | null; expires_on: string | null }>(),
    env.DB.prepare("SELECT * FROM inks WHERE active = 1 ORDER BY brand, name").all<Ink>(),
    env.DB.prepare("SELECT COUNT(*) AS n FROM bookings WHERE client_id = ? AND status = 'no_show' AND id != ?")
      .bind(clientId, bookingId)
      .first<{ n: number }>(),
  ]);
  return { sessions: sessions.results, used: used.results, inks: inks.results, noShows: noShows?.n ?? 0 };
}

export function ProjectAndInks(props: {
  bookingId: number;
  kind: string;
  data: Awaited<ReturnType<typeof bookingStudioData>>;
  when: (iso: string | null) => string;
  features?: import("../lib/features").Features;
}) {
  const { data, bookingId } = props;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      {props.features?.sessions !== false && (
      <>
      <h2>Økter</h2>
      <div class="card">
        {data.sessions.length > 1 ? (
          <table>
            <tbody>
              {data.sessions.map((s, i) => (
                <tr>
                  <td>Økt {i + 1}</td>
                  <td>{s.id === bookingId ? <strong>{props.when(s.starts_at)}</strong> : <a href={`/admin/bookings/${s.id}`}>{props.when(s.starts_at)}</a>}</td>
                  <td class="muted">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p class="muted" style="margin-top:0">Større prosjekt over flere ganger? Book neste økt herfra, så henger de sammen.</p>
        )}
        <form method="post" action={`/admin/bookings/${bookingId}/next-session`} class="row">
          <label>
            Dato
            <input name="date" type="date" required />
          </label>
          <label>
            Tid
            <input name="time" type="time" required step="900" />
          </label>
          <label>
            Varighet (min)
            <input name="duration" type="number" min="15" step="15" placeholder="Samme som denne" />
          </label>
          <div style="flex:0 0 auto">
            <button class="secondary">Book neste økt</button>
          </div>
        </form>
      </div>
      </>
      )}

      {props.kind === "tattoo" && props.features?.inks !== false && (
        <>
          <h2>Blekk brukt</h2>
          <div class="card">
            {data.used.length > 0 && (
              <table>
                <tbody>
                  {data.used.map((u) => (
                    <tr>
                      <td>{inkLabel(u)}</td>
                      <td class="muted">{u.expires_on && (u.expires_on < today ? `⚠ utløpt ${u.expires_on}` : `holdbar til ${u.expires_on}`)}</td>
                      <td class="num">
                        <form method="post" action={`/admin/bookings/${bookingId}/inks/${u.id}/delete`}>
                          <button class="secondary">Fjern</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {data.inks.length > 0 ? (
              <form method="post" action={`/admin/bookings/${bookingId}/inks`} class="row">
                <label>
                  Legg til blekk
                  <select name="ink_id">
                    {data.inks.map((i) => (
                      <option value={String(i.id)}>{inkLabel(i)}</option>
                    ))}
                  </select>
                </label>
                <div style="flex:0 0 auto">
                  <button class="secondary">Legg til</button>
                </div>
              </form>
            ) : (
              <p class="muted">
                Ingen blekk registrert ennå. <a href="/admin/inks">Legg inn blekk</a>.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}

// ---------- Booking actions ----------

studio.post("/bookings/:id/next-session", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  const date = str(body, "date");
  const time = str(body, "time");
  const back = `/admin/bookings/${id}`;
  if (!isDateString(date) || !/^\d{2}:\d{2}$/.test(time)) return c.redirect(`${back}?error=Velg+dato+og+tid`);
  const b = await c.env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first<{
    id: number;
    project_id: number | null;
    client_id: number;
    staff_id: number | null;
    service_id: number;
    starts_at: string | null;
    ends_at: string | null;
    price_ore: number | null;
    idea: string | null;
    placement: string | null;
    size: string | null;
    style: string | null;
    language: string;
  }>();
  if (!b) return c.notFound();
  const previous = b.starts_at && b.ends_at ? Math.round((Date.parse(b.ends_at) - Date.parse(b.starts_at)) / 60000) : 180;
  const duration = Number(str(body, "duration")) || previous;
  const startsAt = osloToUtc(date, time).toISOString();
  const endsAt = new Date(Date.parse(startsAt) + duration * 60000).toISOString();
  const projectId = b.project_id ?? b.id;
  // No new deposit: the first session's deposit covers the project unless staff add one.
  const created = await c.env.DB.prepare(
    `INSERT INTO bookings (public_id, project_id, client_id, staff_id, service_id, status, starts_at, ends_at, price_ore, deposit_ore,
       idea, placement, size, style, source, language)
     VALUES (?, ?, ?, ?, ?, 'confirmed', ?, ?, ?, 0, ?, ?, ?, ?, 'staff', ?) RETURNING id`,
  )
    .bind(crypto.randomUUID(), projectId, b.client_id, b.staff_id, b.service_id, startsAt, endsAt, b.price_ore, b.idea, b.placement, b.size, b.style, b.language)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "booking", created!.id, { project_id: projectId });
  return c.redirect(`/admin/bookings/${created!.id}?ok=Neste+økt+lagt+inn.+Send+bekreftelse+til+kunden+herfra.`);
});

studio.post("/bookings/:id/inks", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  const inkId = Number(str(body, "ink_id"));
  if (inkId) {
    await c.env.DB.prepare("INSERT OR IGNORE INTO booking_inks (booking_id, ink_id, by) VALUES (?, ?, ?)").bind(id, inkId, c.get("user").email).run();
  }
  return c.redirect(`/admin/bookings/${id}`);
});

studio.post("/bookings/:id/inks/:useId/delete", async (c) => {
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare("DELETE FROM booking_inks WHERE id = ? AND booking_id = ?").bind(Number(c.req.param("useId")), id).run();
  await audit(c.env, c.get("user"), "delete", "booking_ink", id);
  return c.redirect(`/admin/bookings/${id}`);
});

// ---------- Ink register ----------

const flash = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });

studio.get("/inks", async (c) => {
  const showAll = c.req.query("all") === "1";
  const inks = await c.env.DB.prepare(
    `SELECT i.*, (SELECT COUNT(*) FROM booking_inks bi WHERE bi.ink_id = i.id) AS uses FROM inks i
     ${showAll ? "" : "WHERE i.active = 1"} ORDER BY i.active DESC, i.brand, i.name`,
  ).all<Ink & { uses: number }>();
  const today = new Date().toISOString().slice(0, 10);
  const trace = Number(c.req.query("trace"));
  const traced = trace
    ? await c.env.DB.prepare(
        `SELECT b.id, b.starts_at, c.name, c.phone, c.email FROM booking_inks bi JOIN bookings b ON b.id = bi.booking_id
         JOIN clients c ON c.id = b.client_id WHERE bi.ink_id = ? ORDER BY b.starts_at`,
      )
        .bind(trace)
        .all<{ id: number; starts_at: string | null; name: string; phone: string | null; email: string | null }>()
    : null;

  return c.html(
    <Layout title="Blekk" path="/admin/inks" user={c.get("user")} {...flash(c)}>
      <h1>Blekk</h1>
      <p class="muted">Register over blekk og batchnummer. Legg til blekket på hver tatovering, så kan du finne alle kunder som har fått en batch hvis den blir tilbakekalt.</p>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Merke</th>
              <th>Farge / navn</th>
              <th>Batch</th>
              <th>Holdbar til</th>
              <th>Leverandør</th>
              <th class="num">Brukt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inks.results.map((i) => (
              <tr class={i.active ? "" : "muted"}>
                <td>{i.brand}</td>
                <td>{i.name}</td>
                <td>{i.batch}</td>
                <td>{i.expires_on && (i.expires_on < today ? <span style="color:var(--warn)">⚠ {i.expires_on}</span> : i.expires_on)}</td>
                <td class="muted">{i.supplier}</td>
                <td class="num">
                  <a href={`/admin/inks?trace=${i.id}`}>{i.uses} kunder</a>
                </td>
                <td class="num">
                  <form method="post" action={`/admin/inks/${i.id}`} style="display:flex;gap:.3rem;justify-content:flex-end">
                    <button class="secondary" name="action" value={i.in_stock ? "out" : "in"}>
                      {i.in_stock ? "Tomt" : "På lager"}
                    </button>
                    <button class="secondary" name="action" value={i.active ? "archive" : "restore"}>
                      {i.active ? "Arkiver" : "Gjenopprett"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!inks.results.length && <p class="muted">Ingen blekk registrert ennå.</p>}
        <p>
          <a href={showAll ? "/admin/inks" : "/admin/inks?all=1"}>{showAll ? "Skjul arkiverte" : "Vis arkiverte"}</a>
        </p>
      </div>

      {traced && (
        <div class="card">
          <strong>Kunder som har fått dette blekket</strong>
          <table>
            <tbody>
              {traced.results.map((t) => (
                <tr>
                  <td>
                    <a href={`/admin/bookings/${t.id}`}>{t.starts_at?.slice(0, 10) ?? "–"}</a>
                  </td>
                  <td>{t.name}</td>
                  <td class="muted">{t.phone}</td>
                  <td class="muted">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Nytt blekk</h2>
      <form method="post" action="/admin/inks/new" class="card">
        <div class="row">
          <label>
            Merke
            <input name="brand" required placeholder="Eternal, Dynamic, World Famous…" />
          </label>
          <label>
            Farge / navn
            <input name="name" required placeholder="Lining Black" />
          </label>
          <label>
            Batch / lot
            <input name="batch" />
          </label>
          <label>
            Holdbar til
            <input name="expires_on" type="date" />
          </label>
          <label>
            Leverandør
            <input name="supplier" />
          </label>
        </div>
        <button>Legg til</button>
      </form>
    </Layout>,
  );
});

studio.post("/inks/new", async (c) => {
  const body = await c.req.parseBody();
  const brand = str(body, "brand");
  const name = str(body, "name");
  if (!brand || !name) return c.redirect("/admin/inks?error=Mangler+merke+eller+navn");
  const expires = str(body, "expires_on");
  const row = await c.env.DB.prepare("INSERT INTO inks (brand, name, batch, expires_on, supplier) VALUES (?, ?, ?, ?, ?) RETURNING id")
    .bind(brand, name, str(body, "batch") || null, isDateString(expires) ? expires : null, str(body, "supplier") || null)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "ink", row!.id);
  return c.redirect("/admin/inks?ok=Blekk+lagt+til");
});

studio.post("/inks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const action = str(await c.req.parseBody(), "action");
  const update: Record<string, string> = {
    out: "in_stock = 0",
    in: "in_stock = 1",
    archive: "active = 0",
    restore: "active = 1",
  };
  if (!update[action]) return c.redirect("/admin/inks");
  await c.env.DB.prepare(`UPDATE inks SET ${update[action]} WHERE id = ?`).bind(id).run();
  return c.redirect("/admin/inks");
});
