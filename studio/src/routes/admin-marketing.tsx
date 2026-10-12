import type { Context } from "hono";

import { recentNotifications, markSeen, seenAt } from "../lib/notifications";
import { formatOre, parseKroner } from "../lib/report";
import { loadReviewSettings, reviewStats } from "../lib/reviews";
import { saveSettings } from "../lib/settings";
import { businessDate, localTime } from "../lib/time";
import { Icon, Layout } from "../views/layout";
import { Empty, PageHead, SegTabs, SettingsTitle } from "../views/ui";
import { SettingsPage } from "./admin-settings";
import { adminApp, audit, staffList, str, type AdminEnv } from "./admin-shared";

/** Flash, Anmeldelser and the bell: the parts of Linework the trial account couldn't show in use. */
export const marketing = adminApp();

const msg = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });
const isManager = (c: Context<AdminEnv>) => ["owner", "reception"].includes(c.get("user").role);
const stamp = (iso: string) => `${businessDate(iso)} ${localTime(iso)}`;

// ---------- Flash ----------

// PLACEHOLDER-RESCAN: Linework's Settings → Flash was empty in the trial ("Nothing shared yet"), and
// the artist side that shares flash was never seen. Here artists add their own flash on this page and
// the studio switches each one on or off for the booking page. Fields and layout are our guess.

type FlashRow = {
  id: number;
  staff_id: number | null;
  staff_name: string | null;
  title: string;
  description: string | null;
  price_ore: number | null;
  size: string | null;
  duration_min: number | null;
  r2_key: string | null;
  image_url: string | null;
  repeatable: number;
  on_booking: number;
  status: string;
  bookings: number;
};

const FLASH_STATUS: Record<string, string> = { available: "Ledig", taken: "Tatt", archived: "Arkivert" };
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export const flashImage = (f: { id: number; r2_key: string | null; image_url: string | null }) => (f.r2_key ? `/api/flash/${f.id}/image` : f.image_url);

marketing.get("/settings/flash", async (c) => {
  const user = c.get("user");
  const archived = c.req.query("archived") === "1";
  const [rows, staff] = await Promise.all([
    c.env.DB.prepare(
      `SELECT f.*, s.name AS staff_name, (SELECT COUNT(*) FROM bookings b WHERE b.flash_id = f.id) AS bookings
       FROM flash f LEFT JOIN staff s ON s.id = f.staff_id
       WHERE f.status ${archived ? "= 'archived'" : "!= 'archived'"} ORDER BY f.sort, f.id DESC`,
    ).all<FlashRow>(),
    staffList(c.env),
  ]);
  const edit = rows.results.find((f) => f.id === Number(c.req.query("edit")));
  const mine = (f: FlashRow) => isManager(c) || f.staff_id === user.staffId;
  const link = `${c.env.SITE_URL.replace(/\/$/, "")}/#booking`;
  const shown = rows.results.filter((f) => f.on_booking && f.status === "available").length;
  return c.html(
    <SettingsPage c={c} active="/admin/settings/flash" title="Flash">
      <SettingsTitle icon="bolt" title="Flash" sub="Flash-design artistene deler med studioet. Velg hvilke som vises på bookingsiden." />
      <div class="toolbar">
        <SegTabs
          tabs={[
            { href: "/admin/settings/flash", label: "Delt med studioet", count: archived ? undefined : rows.results.length },
            { href: "/admin/settings/flash?archived=1", label: "Arkivert" },
          ]}
          active={archived ? "/admin/settings/flash?archived=1" : "/admin/settings/flash"}
        />
        <span class="spacer" style="flex:1" />
        <span class="muted">{shown} vises på bookingsiden</span>
        <button type="button" class="secondary small" onclick={`navigator.clipboard.writeText(${JSON.stringify(link)});this.textContent='Kopiert'`}>
          Kopier lenke
        </button>
      </div>
      {rows.results.length === 0 ? (
        <Empty icon="bolt" text={archived ? "Ingenting arkivert" : "Ingenting delt ennå"}>
          {!archived && <p class="muted">Når artistene deler flash med studioet, vises det her.</p>}
        </Empty>
      ) : (
        <div class="grid flash-grid">
          {rows.results.map((f) => (
            <div class="card" style="margin:0;padding:0;overflow:hidden">
              {flashImage(f) ? (
                <img src={flashImage(f)!} alt={f.title} loading="lazy" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;background:var(--soft)" />
              ) : (
                <div style="aspect-ratio:1;display:grid;place-items:center;background:var(--soft);color:var(--muted)">
                  <Icon name="bolt" size={40} />
                </div>
              )}
              <div style="padding:.75rem">
                <strong>{f.title}</strong>
                <div class="muted" style="font-size:.85rem">
                  {[f.staff_name ?? "Studio", f.size, f.price_ore != null ? formatOre(f.price_ore) : null].filter(Boolean).join(" · ")}
                </div>
                <div style="margin:.4rem 0;display:flex;gap:.3rem;flex-wrap:wrap">
                  <span class={`pill${f.status === "available" ? " confirmed" : ""}`}>{FLASH_STATUS[f.status]}</span>
                  {f.on_booking ? <span class="pill confirmed">På bookingsiden</span> : <span class="pill">Ikke på bookingsiden</span>}
                  {!f.repeatable && <span class="pill">Én gang</span>}
                  {f.bookings > 0 && <span class="pill">{f.bookings} bookinger</span>}
                </div>
                {mine(f) && (
                  <form method="post" action={`/admin/settings/flash/${f.id}`} style="display:flex;gap:.3rem;flex-wrap:wrap">
                    {isManager(c) && f.status === "available" && (
                      <button class="secondary small" name="action" value={f.on_booking ? "hide" : "show"}>
                        {f.on_booking ? "Fjern fra bookingsiden" : "Vis på bookingsiden"}
                      </button>
                    )}
                    {f.status !== "archived" && (
                      <button class="secondary small" name="action" value={f.status === "taken" ? "available" : "taken"}>
                        {f.status === "taken" ? "Ledig igjen" : "Merk som tatt"}
                      </button>
                    )}
                    <button class="secondary small" name="action" value={f.status === "archived" ? "available" : "archive"}>
                      {f.status === "archived" ? "Gjenopprett" : "Arkiver"}
                    </button>
                    <a class="button secondary small" href={`/admin/settings/flash?edit=${f.id}#ny`}>
                      Rediger
                    </a>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 id="ny">{edit ? `Rediger «${edit.title}»` : "Del flash"}</h2>
      <form method="post" action={edit ? `/admin/settings/flash/${edit.id}/edit` : "/admin/settings/flash"} enctype="multipart/form-data" class="card">
        <div class="row">
          <label>
            Tittel
            <input name="title" required maxlength={80} value={edit?.title ?? ""} placeholder="Liten svale" />
          </label>
          <label>
            Artist
            <select name="staff_id" disabled={!isManager(c)}>
              {staff.map((s) => (
                <option value={s.id} selected={s.id === (edit?.staff_id ?? user.staffId)}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Pris (kr)
            <input name="price" inputmode="decimal" value={edit?.price_ore != null ? String(edit.price_ore / 100) : ""} placeholder="1500" />
          </label>
          <label>
            Størrelse
            <input name="size" maxlength={40} value={edit?.size ?? ""} placeholder="ca. 8 cm" />
          </label>
          <label>
            Varighet (min)
            <input name="duration_min" inputmode="numeric" value={edit?.duration_min ? String(edit.duration_min) : ""} placeholder="90" />
          </label>
        </div>
        <label>
          Beskrivelse (valgfritt)
          <textarea name="description" rows={2} maxlength={500}>
            {edit?.description ?? ""}
          </textarea>
        </label>
        <div class="row">
          {c.env.PHOTOS && (
            <label>
              Bilde
              <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
            </label>
          )}
          <label>
            {c.env.PHOTOS ? "eller lenke til bilde" : "Lenke til bilde"}
            <input name="image_url" type="url" value={edit?.image_url ?? ""} placeholder="https://" />
          </label>
        </div>
        <label class="check">
          <input type="checkbox" name="repeatable" value="1" checked={edit ? Boolean(edit.repeatable) : true} />
          Kan tatoveres flere ganger (ellers merkes den som tatt etter første time)
        </label>
        {isManager(c) && (
          <label class="check">
            <input type="checkbox" name="on_booking" value="1" checked={edit ? Boolean(edit.on_booking) : true} />
            Vis på bookingsiden
          </label>
        )}
        <button>{edit ? "Lagre" : "Del flash"}</button>
        {edit && (
          <a class="button secondary" href="/admin/settings/flash" style="margin-left:.5rem">
            Avbryt
          </a>
        )}
      </form>
    </SettingsPage>,
  );
});

type FlashFields = {
  title: string;
  staffId: number | null;
  price: number | null;
  duration: number | null;
  size: string | null;
  description: string | null;
  imageUrl: string | null;
  image: { key: string; type: string } | null;
  repeatable: number;
  onBooking: number;
};

async function flashFromForm(c: Context<AdminEnv>, body: Record<string, unknown>): Promise<FlashFields | { error: string }> {
  const title = str(body, "title").slice(0, 80);
  const price = str(body, "price") ? parseKroner(str(body, "price")) : null;
  const duration = Number(str(body, "duration_min")) || null;
  const imageUrl = str(body, "image_url");
  if (!title) return { error: "Mangler tittel" };
  if (price != null && price < 0) return { error: "Sjekk prisen" };
  if (imageUrl && !/^https:\/\//.test(imageUrl)) return { error: "Bildelenken må starte med https://" };
  const file = body.image;
  let image: { key: string; type: string } | null = null;
  if (c.env.PHOTOS && typeof file === "object" && file !== null && "arrayBuffer" in file && (file as File).size > 0) {
    const f = file as File;
    if (!IMAGE_TYPES.includes(f.type) || f.size > MAX_IMAGE_BYTES) return { error: "Bildet må være JPG, PNG eller WebP under 8 MB" };
    image = { key: `flash/${crypto.randomUUID()}`, type: f.type };
    await c.env.PHOTOS.put(image.key, f.stream(), { httpMetadata: { contentType: f.type } });
  }
  const user = c.get("user");
  const staffId = isManager(c) ? Number(str(body, "staff_id")) || null : user.staffId;
  return {
    title,
    staffId,
    price,
    duration: duration && duration > 0 && duration <= 720 ? Math.round(duration) : null,
    size: str(body, "size").slice(0, 40) || null,
    description: str(body, "description").slice(0, 500) || null,
    imageUrl: imageUrl || null,
    image,
    repeatable: str(body, "repeatable") === "1" ? 1 : 0,
    onBooking: isManager(c) && str(body, "on_booking") === "1" ? 1 : 0,
  };
}

marketing.post("/settings/flash", async (c) => {
  const f = await flashFromForm(c, await c.req.parseBody());
  if ("error" in f) return c.redirect(`/admin/settings/flash?error=${encodeURIComponent(f.error)}#ny`);
  const row = await c.env.DB.prepare(
    `INSERT INTO flash (staff_id, title, description, price_ore, size, duration_min, r2_key, content_type, image_url, repeatable, on_booking)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
  )
    .bind(f.staffId, f.title, f.description, f.price, f.size, f.duration, f.image?.key ?? null, f.image?.type ?? null, f.imageUrl, f.repeatable, f.onBooking)
    .first<{ id: number }>();
  await audit(c.env, c.get("user"), "create", "flash", row!.id);
  return c.redirect("/admin/settings/flash?ok=Flash+delt");
});

async function ownFlash(c: Context<AdminEnv>, id: number) {
  const row = await c.env.DB.prepare("SELECT id, staff_id, on_booking, r2_key FROM flash WHERE id = ?").bind(id).first<{ id: number; staff_id: number | null; on_booking: number; r2_key: string | null }>();
  return row && (isManager(c) || row.staff_id === c.get("user").staffId) ? row : null;
}

marketing.post("/settings/flash/:id/edit", async (c) => {
  const id = Number(c.req.param("id"));
  const existing = await ownFlash(c, id);
  if (!existing) return c.redirect("/admin/settings/flash?error=Fant+ikke+flash");
  const f = await flashFromForm(c, await c.req.parseBody());
  if ("error" in f) return c.redirect(`/admin/settings/flash?edit=${id}&error=${encodeURIComponent(f.error)}#ny`);
  if (f.image && existing.r2_key) await c.env.PHOTOS?.delete(existing.r2_key);
  await c.env.DB.prepare(
    `UPDATE flash SET staff_id = ?, title = ?, description = ?, price_ore = ?, size = ?, duration_min = ?, image_url = ?, repeatable = ?,
       on_booking = ?, r2_key = COALESCE(?, r2_key), content_type = COALESCE(?, content_type) WHERE id = ?`,
  )
    .bind(f.staffId, f.title, f.description, f.price, f.size, f.duration, f.imageUrl, f.repeatable, isManager(c) ? f.onBooking : existing.on_booking, f.image?.key ?? null, f.image?.type ?? null, id)
    .run();
  await audit(c.env, c.get("user"), "update", "flash", id);
  return c.redirect("/admin/settings/flash?ok=Lagret");
});

marketing.post("/settings/flash/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!(await ownFlash(c, id))) return c.redirect("/admin/settings/flash?error=Fant+ikke+flash");
  const action = str(await c.req.parseBody(), "action");
  const update: Record<string, string> = isManager(c) ? { show: "on_booking = 1", hide: "on_booking = 0" } : {};
  Object.assign(update, { taken: "status = 'taken'", available: "status = 'available'", archive: "status = 'archived', on_booking = 0" });
  if (!update[action]) return c.redirect("/admin/settings/flash");
  await c.env.DB.prepare(`UPDATE flash SET ${update[action]} WHERE id = ?`).bind(id).run();
  return c.redirect("/admin/settings/flash");
});

// ---------- Anmeldelser ----------

type ReviewRow = {
  id: number;
  booking_id: number;
  staff_id: number | null;
  staff_name: string | null;
  client_name: string;
  rating: number | null;
  comment: string | null;
  may_publish: number;
  hidden: number;
  requested_at: string;
  submitted_at: string | null;
};

const Stars = ({ n }: { n: number }) => (
  <span aria-label={`${n} av 5`} style="color:var(--warn);letter-spacing:1px;white-space:nowrap">
    {"★".repeat(n)}
    <span style="color:var(--line)">{"★".repeat(5 - n)}</span>
  </span>
);

marketing.get("/reviews", async (c) => {
  const filter = c.req.query("show") === "waiting" ? "waiting" : "answered";
  const [rows, settings] = await Promise.all([
    c.env.DB.prepare(
      `SELECT r.*, s.name AS staff_name, cl.name AS client_name FROM reviews r
       JOIN bookings b ON b.id = r.booking_id JOIN clients cl ON cl.id = b.client_id LEFT JOIN staff s ON s.id = r.staff_id
       ORDER BY COALESCE(r.submitted_at, r.requested_at) DESC LIMIT 500`,
    ).all<ReviewRow>(),
    loadReviewSettings(c.env),
  ]);
  const answered = rows.results.filter((r) => r.submitted_at);
  const stats = reviewStats(answered.filter((r) => !r.hidden));
  const total = stats.get(0);
  const artists = [...new Map(answered.filter((r) => r.staff_id).map((r) => [r.staff_id!, r.staff_name ?? ""])).entries()];
  const list = filter === "answered" ? answered : rows.results.filter((r) => !r.submitted_at);
  return c.html(
    <Layout title="Anmeldelser" path="/admin/reviews" user={c.get("user")} {...msg(c)}>
      <PageHead title="Anmeldelser" sub="Kundene får en lenke i e-posten etter timen: stjerner, en kommentar, og så Google-lenken." />
      <div class="toolbar">
        <div class="stat">
          <Icon name="star" />
          <div>
            <strong>{total ? `${String(total.average).replace(".", ",")} av 5` : "–"}</strong>
            <span>Snitt fra {total?.count ?? 0} anmeldelser</span>
          </div>
        </div>
        <div class="stat">
          <Icon name="percent" />
          <div>
            <strong>{rows.results.length ? Math.round((answered.length / rows.results.length) * 100) : 0} %</strong>
            <span>Svarte av {rows.results.length} spurt</span>
          </div>
        </div>
        {artists.map(([id, name]) => (
          <div class="stat">
            <Icon name="artists" />
            <div>
              <strong>{stats.get(id) ? `${String(stats.get(id)!.average).replace(".", ",")} av 5` : "–"}</strong>
              <span>
                {name} ({stats.get(id)?.count ?? 0})
              </span>
            </div>
          </div>
        ))}
      </div>
      <p>
        <SegTabs
          tabs={[
            { href: "/admin/reviews", label: "Svar", count: answered.length },
            { href: "/admin/reviews?show=waiting", label: "Venter på svar", count: rows.results.length - answered.length },
          ]}
          active={filter === "answered" ? "/admin/reviews" : "/admin/reviews?show=waiting"}
        />
      </p>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Kunde</th>
              <th>Artist</th>
              {filter === "answered" && <th>Stjerner</th>}
              {filter === "answered" && <th>Kommentar</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr class={r.hidden ? "muted" : ""}>
                <td>{businessDate(r.submitted_at ?? r.requested_at)}</td>
                <td>
                  <a href={`/admin/bookings/${r.booking_id}`}>{r.client_name}</a>
                </td>
                <td>{r.staff_name ?? "–"}</td>
                {filter === "answered" && (
                  <td>
                    <Stars n={r.rating ?? 0} />
                  </td>
                )}
                {filter === "answered" && (
                  <td>
                    {r.comment ?? <span class="muted">Ingen kommentar</span>}
                    {r.may_publish ? <div class="muted" style="font-size:.8rem">Kan vises på nettsiden</div> : null}
                  </td>
                )}
                <td class="num">
                  {r.submitted_at && isManager(c) && (
                    <form method="post" action={`/admin/reviews/${r.id}`}>
                      <button class="secondary small" name="action" value={r.hidden ? "show" : "hide"}>
                        {r.hidden ? "Vis" : "Skjul"}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <Empty icon="star" text={filter === "answered" ? "Ingen anmeldelser ennå" : "Ingen venter på svar"} />}
      </div>
      {c.get("user").role === "owner" && (
        <form method="post" action="/admin/reviews/settings" class="card" style="margin-top:1.5rem">
          <strong>Google-anmeldelse</strong>
          <p class="muted" style="margin:.25rem 0 .75rem">
            Lenken kundene får etter at de har svart. Finn den i Google-bedriftsprofilen under «Be om anmeldelser». Alle som svarer får lenken, også de som ga få stjerner, fordi Google ikke tillater å
            sortere bort misfornøyde kunder.
          </p>
          <div class="row">
            <label>
              Lenke
              <input name="google_url" type="url" value={settings.googleUrl} placeholder="https://g.page/r/…/review" />
            </label>
            <div style="flex:0 0 auto">
              <button>Lagre</button>
            </div>
          </div>
        </form>
      )}
    </Layout>,
  );
});

marketing.post("/reviews/settings", async (c) => {
  if (c.get("user").role !== "owner") return c.redirect("/admin/reviews?error=Bare+eieren+kan+endre+dette");
  const url = str(await c.req.parseBody(), "google_url");
  if (url && !/^https:\/\//.test(url)) return c.redirect("/admin/reviews?error=Lenken+må+starte+med+https://");
  await saveSettings(c.env, "reviews.", { google_url: url });
  return c.redirect("/admin/reviews?ok=Lagret");
});

marketing.post("/reviews/:id", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/reviews");
  const action = str(await c.req.parseBody(), "action");
  if (action === "hide" || action === "show") {
    await c.env.DB.prepare("UPDATE reviews SET hidden = ? WHERE id = ?").bind(action === "hide" ? 1 : 0, Number(c.req.param("id"))).run();
  }
  return c.redirect("/admin/reviews");
});

// ---------- Varsler (the bell) ----------

const NOTE_ICONS: Record<string, string> = { request: "inbox", deposit: "deposit", consent: "forms", gift_card: "gift", review: "star" };

marketing.get("/notifications", async (c) => {
  const user = c.get("user");
  const [items, seen] = await Promise.all([recentNotifications(c.env), seenAt(c.env, user.email)]);
  await markSeen(c.env, user.email);
  return c.html(
    <Layout title="Varsler" path="/admin/notifications" user={{ ...user, notifications: 0 }}>
      <h1>Varsler</h1>
      {items.length === 0 ? (
        <Empty icon="bell" text="Ingen varsler ennå" />
      ) : (
        <div class="notes">
          {items.map((n) => (
            <a class={`note${!seen || n.at > seen ? " unseen" : ""}`} href={n.href}>
              <Icon name={NOTE_ICONS[n.kind] ?? "bell"} size={18} />
              <span>
                {n.text}
                <span class="muted">{stamp(n.at)}</span>
              </span>
            </a>
          ))}
        </div>
      )}
      <p class="muted" style="font-size:.85rem">Viser de siste 30 dagene.</p>
    </Layout>,
  );
});
