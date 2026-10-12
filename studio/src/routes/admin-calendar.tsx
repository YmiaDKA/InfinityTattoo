import { addDays, businessDate, isDateString, isoWeekday, localTime } from "../lib/time";
import { Icon, Layout, StatusPill } from "../views/layout";
import { adminApp, BOOKING_SELECT, dayRange, today, type BookingRow } from "./admin-shared";

/**
 * Calendar laid out like Linework's: a month picker on the left, Today / back / forward and the
 * week number on top, a Day/Week switch, and a time grid. The day view has one column per artist.
 */
export const calendar = adminApp();

const HOUR_PX = 64;
const MONTHS = ["jan.", "feb.", "mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des."];
const MONTH_NAMES = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
const WEEKDAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

export function isoWeek(date: string): number {
  const thursday = addDays(date, 4 - isoWeekday(date));
  const jan1 = `${thursday.slice(0, 4)}-01-01`;
  const days = (Date.parse(`${thursday}T00:00:00Z`) - Date.parse(`${jan1}T00:00:00Z`)) / 86400000;
  return Math.floor(days / 7) + 1;
}

const monday = (date: string) => addDays(date, 1 - isoWeekday(date));
const dayNum = (date: string) => Number(date.slice(8, 10));
const monthIdx = (date: string) => Number(date.slice(5, 7)) - 1;
const minutesOf = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

function rangeLabel(days: string[]) {
  const a = days[0];
  const b = days[days.length - 1];
  if (days.length === 1) return `${WEEKDAYS[isoWeekday(a) - 1]} ${dayNum(a)}. ${MONTHS[monthIdx(a)]} ${a.slice(0, 4)}`;
  if (monthIdx(a) === monthIdx(b)) return `${dayNum(a)}.–${dayNum(b)}. ${MONTHS[monthIdx(b)]} ${b.slice(0, 4)}`;
  return `${dayNum(a)}. ${MONTHS[monthIdx(a)]} – ${dayNum(b)}. ${MONTHS[monthIdx(b)]} ${b.slice(0, 4)}`;
}

type Column = { key: string; date: string; staffId: number | null; title: string; sub?: string; color?: string };
type Block = { top: number; height: number };

calendar.get("/calendar", async (c) => {
  const view = c.req.query("view") === "day" ? "day" : "week";
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const staffFilter = Number(c.req.query("staff")) || null;
  const days = view === "day" ? [date] : Array.from({ length: 7 }, (_, i) => addDays(monday(date), i));
  const [from] = dayRange(days[0]);
  const [, to] = dayRange(days[days.length - 1]);

  const [bookingRows, staffRows, hourRows, offRows] = await Promise.all([
    c.env.DB.prepare(
      `${BOOKING_SELECT} WHERE b.starts_at >= ? AND b.starts_at < ? AND b.status IN ('requested','confirmed','completed','no_show') ORDER BY b.starts_at`,
    )
      .bind(from, to)
      .all<BookingRow>(),
    c.env.DB.prepare("SELECT id, name, color FROM staff WHERE active = 1 AND bookable = 1 ORDER BY id").all<{ id: number; name: string; color: string }>(),
    c.env.DB.prepare("SELECT staff_id, weekday, start_time, end_time FROM working_hours").all<{
      staff_id: number;
      weekday: number;
      start_time: string;
      end_time: string;
    }>(),
    c.env.DB.prepare("SELECT staff_id, starts_at, ends_at, reason FROM time_off WHERE starts_at < ? AND ends_at > ?")
      .bind(to, from)
      .all<{ staff_id: number | null; starts_at: string; ends_at: string; reason: string | null }>(),
  ]);
  const staff = staffRows.results;
  const visibleStaff = staffFilter ? staff.filter((s) => s.id === staffFilter) : staff;
  const bookings = bookingRows.results.filter((b) => !staffFilter || b.staff_id === staffFilter);

  // Hours shown: opening hours padded by an hour, widened to fit any booking outside them.
  let startMin = 9 * 60;
  let endMin = 19 * 60;
  for (const h of hourRows.results) {
    startMin = Math.min(startMin, minutesOf(h.start_time) - 60);
    endMin = Math.max(endMin, minutesOf(h.end_time) + 60);
  }
  for (const b of bookings) {
    if (!b.starts_at) continue;
    startMin = Math.min(startMin, minutesOf(localTime(b.starts_at)));
    if (b.ends_at) endMin = Math.max(endMin, minutesOf(localTime(b.ends_at)) || 24 * 60);
  }
  const startHour = Math.max(0, Math.floor(startMin / 60));
  const endHour = Math.min(24, Math.ceil(endMin / 60));
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const gridHeight = hours.length * HOUR_PX;

  const block = (fromMin: number, toMin: number): Block => {
    const top = Math.max(0, ((fromMin - startHour * 60) / 60) * HOUR_PX);
    const bottom = Math.min(gridHeight, ((toMin - startHour * 60) / 60) * HOUR_PX);
    return { top, height: Math.max(18, bottom - top) };
  };
  const timeBlock = (startIso: string, endIso: string | null, onDate: string): Block | null => {
    const s = businessDate(startIso) < onDate ? 0 : minutesOf(localTime(startIso));
    const e = !endIso || businessDate(endIso) > onDate ? 24 * 60 : minutesOf(localTime(endIso));
    return e > s ? block(s, e) : null;
  };

  const columns: Column[] =
    view === "day"
      ? visibleStaff.map((s) => ({ key: `${date}-${s.id}`, date, staffId: s.id, title: s.name, color: s.color }))
      : days.map((d) => ({ key: d, date: d, staffId: staffFilter, title: WEEKDAYS[isoWeekday(d) - 1], sub: `${dayNum(d)}. ${MONTHS[monthIdx(d)]}` }));

  /** Grey where nobody (or this artist) works: outside opening hours and time off. */
  const closedBlocks = (col: Column): (Block & { label?: string })[] => {
    const wd = isoWeekday(col.date);
    const who = col.staffId ? [col.staffId] : visibleStaff.map((s) => s.id);
    const open = hourRows.results.filter((h) => h.weekday === wd && who.includes(h.staff_id));
    const out: (Block & { label?: string })[] = [];
    if (!open.length) out.push({ top: 0, height: gridHeight, label: "Stengt" });
    else {
      const s = Math.min(...open.map((h) => minutesOf(h.start_time)));
      const e = Math.max(...open.map((h) => minutesOf(h.end_time)));
      if (s > startHour * 60) out.push(block(startHour * 60, s));
      if (e < endHour * 60) out.push(block(e, endHour * 60));
    }
    for (const t of offRows.results) {
      if (t.staff_id !== null && col.staffId !== null && t.staff_id !== col.staffId) continue;
      if (t.staff_id !== null && col.staffId === null && !(staffFilter === null && visibleStaff.length === 1)) continue;
      const b = timeBlock(t.starts_at, t.ends_at, col.date);
      if (b) out.push({ ...b, label: t.reason ?? "Fri" });
    }
    return out;
  };

  const colBookings = (col: Column) =>
    layoutLanes(
      bookings
        .filter((b) => b.starts_at && businessDate(b.starts_at) === col.date && (view === "week" || b.staff_id === col.staffId))
        .map((b) => ({ b, pos: timeBlock(b.starts_at!, b.ends_at, col.date)! })),
    );

  const qs = (over: Record<string, string | number | null>) => {
    const p = new URLSearchParams({ view, date, ...(staffFilter ? { staff: String(staffFilter) } : {}) });
    for (const [k, v] of Object.entries(over)) {
      if (v === null) p.delete(k);
      else p.set(k, String(v));
    }
    return `/admin/calendar?${p}`;
  };
  const step = view === "day" ? 1 : 7;
  const todayDate = today();
  const nowMin = minutesOf(localTime(new Date()));

  return c.html(
    <Layout title="Kalender" path="/admin/calendar" user={c.get("user")} flash={c.req.query("ok")} wide>
      <div class="cal" id="cal">
        <aside class="cal-side">
          <MiniMonth date={date} view={view} link={(d) => qs({ date: d })} />
          <div class="cal-legend">
            <a href={qs({ staff: null })} aria-current={staffFilter ? undefined : "true"}>
              Alle artister
            </a>
            {staff.map((s) => (
              <a href={qs({ staff: s.id })} aria-current={staffFilter === s.id ? "true" : undefined}>
                <span class="dot" style={`background:${s.color}`} />
                {s.name}
              </a>
            ))}
          </div>
        </aside>
        <section class="cal-main">
          <div class="cal-toolbar">
            <button type="button" class="iconbtn show" aria-label="Vis/skjul månedsoversikt" onclick="document.getElementById('cal').classList.toggle('no-side')">
              <Icon name="sidebar" />
            </button>
            <a class="button secondary small" href={qs({ date: todayDate })}>
              I dag
            </a>
            <a class="iconbtn show" aria-label="Forrige" href={qs({ date: addDays(date, -step) })}>
              <Icon name="left" />
            </a>
            <a class="iconbtn show" aria-label="Neste" href={qs({ date: addDays(date, step) })}>
              <Icon name="right" />
            </a>
            <h1>{rangeLabel(days)}</h1>
            <span class="muted cal-week">Uke {isoWeek(days[0])}</span>
            <span class="spacer" />
            <a class="button small" href={`/admin/bookings/new?date=${view === "day" ? date : days[0] === monday(todayDate) ? todayDate : days[0]}`}>
              Ny avtale
            </a>
            <div class="seg">
              <a href={qs({ view: "day" })} aria-current={view === "day" ? "true" : undefined}>
                Dag
              </a>
              <a href={qs({ view: "week" })} aria-current={view === "week" ? "true" : undefined}>
                Uke
              </a>
            </div>
          </div>

          <div class="cal-grid" style={`--cols:${columns.length || 1}`}>
            <div class="cal-head">
              <div class="cal-gutter" />
              {columns.map((col) => (
                <a
                  class={`cal-colhead${col.date === todayDate && view === "week" ? " today" : ""}`}
                  href={view === "week" ? qs({ view: "day", date: col.date }) : qs({ staff: col.staffId })}
                >
                  {col.color && <span class="dot" style={`background:${col.color}`} />}
                  <strong>{col.title}</strong>
                  {col.sub && <span>{col.sub}</span>}
                </a>
              ))}
            </div>
            <div class="cal-body">
              <div class="cal-gutter" style={`height:${gridHeight}px`}>
                {hours.map((h) => (
                  <span style={`top:${(h - startHour) * HOUR_PX}px`}>{`${String(h).padStart(2, "0")}:00`}</span>
                ))}
              </div>
              {columns.length === 0 && <p class="muted" style="padding:1rem">Ingen artister å vise.</p>}
              {columns.map((col) => (
                <div class="cal-col" style={`height:${gridHeight}px`}>
                  {hours.map((h) => (
                    <a
                      class="cal-slot"
                      style={`top:${(h - startHour) * HOUR_PX}px`}
                      href={`/admin/bookings/new?date=${col.date}&time=${String(h).padStart(2, "0")}:00${col.staffId ? `&staff=${col.staffId}` : ""}`}
                      aria-label={`Ny avtale ${col.date} kl. ${h}`}
                    />
                  ))}
                  {closedBlocks(col).map((b) => (
                    <div class="cal-closed" style={`top:${b.top}px;height:${b.height}px`}>
                      {b.label && <span>{b.label}</span>}
                    </div>
                  ))}
                  {col.date === todayDate && nowMin >= startHour * 60 && nowMin <= endHour * 60 && (
                    <div class="cal-now" style={`top:${((nowMin - startHour * 60) / 60) * HOUR_PX}px`} />
                  )}
                  {colBookings(col).map(({ b, pos, lane, lanes }) => {
                    return (
                      <a
                        class={`cal-event ${b.status}`}
                        href={`/admin/bookings/${b.id}`}
                        style={`top:${pos.top}px;height:${pos.height - 2}px;--c:${b.staff_color ?? "#71717a"};left:calc(${(lane / lanes) * 100}% + 3px);width:calc(${100 / lanes}% - 6px)`}
                      >
                        <span class="t">
                          {localTime(b.starts_at!)}
                          {b.ends_at ? `–${localTime(b.ends_at)}` : ""}
                        </span>
                        <strong>{b.client_name}</strong>
                        <span>{b.service_name}</span>
                        {view === "week" && b.staff_name && <span class="muted">{b.staff_name}</span>}
                        {b.status !== "confirmed" && <StatusPill status={b.status} />}
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var u=new URL(location.href);if(!u.searchParams.has('view')&&innerWidth<700){u.searchParams.set('view','day');location.replace(u);return}var b=document.querySelector('.content'),n=document.querySelector('.cal-now')||document.querySelector('.cal-event');if(b&&n)b.scrollTop=Math.max(0,n.offsetTop-120)})();`,
        }}
      />
    </Layout>,
  );
});

/** Side-by-side lanes for bookings that overlap in time, like any calendar app. */
function layoutLanes<T extends { pos: Block }>(items: T[]): (T & { lane: number; lanes: number })[] {
  const sorted = [...items].sort((a, b) => a.pos.top - b.pos.top);
  const out: (T & { lane: number; lanes: number })[] = [];
  let cluster: (T & { lane: number; lanes: number })[] = [];
  let clusterEnd = -1;
  const flush = () => {
    const lanes = Math.max(1, ...cluster.map((i) => i.lane + 1));
    for (const i of cluster) i.lanes = lanes;
    out.push(...cluster);
    cluster = [];
  };
  for (const item of sorted) {
    if (item.pos.top >= clusterEnd) flush();
    const laneEnds: number[] = [];
    for (const i of cluster) laneEnds[i.lane] = Math.max(laneEnds[i.lane] ?? 0, i.pos.top + i.pos.height);
    let lane = laneEnds.findIndex((end) => end <= item.pos.top);
    if (lane === -1) lane = laneEnds.length;
    cluster.push({ ...item, lane, lanes: 1 });
    clusterEnd = Math.max(clusterEnd, item.pos.top + item.pos.height);
  }
  flush();
  return out;
}

function MiniMonth({ date, view, link }: { date: string; view: string; link: (d: string) => string }) {
  const first = `${date.slice(0, 8)}01`;
  const start = monday(first);
  const nextMonth = addDays(first, 32).slice(0, 8) + "01";
  const prevMonth = addDays(first, -1).slice(0, 8) + "01";
  const weeks: string[][] = [];
  for (let d = start; d < nextMonth || weeks.length < 6; d = addDays(d, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(d, i)));
    if (weeks.length === 6) break;
  }
  const selWeek = monday(date);
  const t = today();
  return (
    <div class="mini">
      <div class="mini-head">
        <strong>{`${MONTH_NAMES[monthIdx(date)]} ${date.slice(0, 4)}`}</strong>
        <a class="iconbtn show" aria-label="Forrige måned" href={link(prevMonth)}>
          <Icon name="left" size={16} />
        </a>
        <a class="iconbtn show" aria-label="Neste måned" href={link(nextMonth)}>
          <Icon name="right" size={16} />
        </a>
      </div>
      <table>
        <thead>
          <tr>
            <th />
            {["M", "T", "O", "T", "F", "L", "S"].map((d) => (
              <th>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((w) => (
            <tr class={view === "week" && w[0] === selWeek ? "sel" : undefined}>
              <td class="wk">{isoWeek(w[0])}</td>
              {w.map((d) => (
                <td class={[d.slice(0, 7) !== date.slice(0, 7) ? "out" : "", d === t ? "today" : "", view === "day" && d === date ? "on" : ""].join(" ").trim() || undefined}>
                  <a href={link(d)}>{dayNum(d)}</a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
