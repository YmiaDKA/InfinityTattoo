import type { Child } from "hono/jsx";

import { addDays } from "../lib/time";
import { Icon } from "./layout";

/** Building blocks for Linework's page pattern: big title, one-line description, actions on the right. */

export function PageHead(props: { title: string; sub?: string; children?: Child }) {
  return (
    <div class="page-head">
      <div>
        <h1>{props.title}</h1>
        {props.sub && <p>{props.sub}</p>}
      </div>
      {props.children && <div class="page-actions">{props.children}</div>}
    </div>
  );
}

/** Underlined tabs (Kunder · Depositum · Skjema). */
export function Tabs(props: { tabs: { href: string; label: string }[]; active: string; children?: Child }) {
  return (
    <div class="tabs">
      {props.tabs.map((t) => (
        <a href={t.href} aria-current={t.href === props.active ? "page" : undefined}>
          {t.label}
        </a>
      ))}
      {props.children && <div class="page-actions">{props.children}</div>}
    </div>
  );
}

/** Segmented tabs with counts (Aktive 2 · Inviterte 0 · Inaktive 1 · Alle). */
export function SegTabs(props: { tabs: { href: string; label: string; count?: number }[]; active: string }) {
  return (
    <div class="seg">
      {props.tabs.map((t) => (
        <a href={t.href} aria-current={t.href === props.active ? "page" : undefined}>
          {t.label}
          {t.count != null && <span class="count">{t.count}</span>}
        </a>
      ))}
    </div>
  );
}

export function Empty(props: { icon: string; text: string; children?: Child }) {
  return (
    <div class="empty">
      <Icon name={props.icon} size={56} />
      <strong>{props.text}</strong>
      {props.children}
    </div>
  );
}

export type PeriodUnit = "day" | "week" | "month" | "year";

const MONTHS = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
const WEEKDAYS = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function mondayOf(date: string) {
  const dow = new Date(`${date}T12:00:00Z`).getUTCDay();
  return addDays(date, -((dow + 6) % 7));
}

export function shiftMonth(date: string, n: number) {
  const [y, m] = date.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 10);
}

/** [from, to] inclusive, and a human label, for a period around `date`. */
export function periodRange(unit: PeriodUnit, date: string): { from: string; to: string; label: string; prev: string; next: string } {
  if (unit === "year") {
    const y = Number(date.slice(0, 4));
    return { from: `${y}-01-01`, to: `${y}-12-31`, label: String(y), prev: `${y - 1}-01-01`, next: `${y + 1}-01-01` };
  }
  if (unit === "month") {
    const from = `${date.slice(0, 7)}-01`;
    const to = addDays(shiftMonth(from, 1), -1);
    return { from, to, label: `${cap(MONTHS[Number(date.slice(5, 7)) - 1])} ${date.slice(0, 4)}`, prev: shiftMonth(from, -1), next: shiftMonth(from, 1) };
  }
  if (unit === "week") {
    const from = mondayOf(date);
    const to = addDays(from, 6);
    const d = (x: string) => `${Number(x.slice(8))}. ${MONTHS[Number(x.slice(5, 7)) - 1].slice(0, 3)}`;
    return { from, to, label: `${d(from)} – ${d(to)} ${to.slice(0, 4)}`, prev: addDays(from, -7), next: addDays(from, 7) };
  }
  const dow = new Date(`${date}T12:00:00Z`).getUTCDay();
  return {
    from: date,
    to: date,
    label: `${cap(WEEKDAYS[dow])} ${Number(date.slice(8))}. ${MONTHS[Number(date.slice(5, 7)) - 1].slice(0, 3)} ${date.slice(0, 4)}`,
    prev: addDays(date, -1),
    next: addDays(date, 1),
  };
}

export const UNIT_LABELS: Record<PeriodUnit, string> = { day: "Dag", week: "Uke", month: "Måned", year: "År" };

/**
 * Linework's period picker: "Dag ▾" then ‹ 📅 Mandag 12. okt 2026 ›. `href(unit, date)` builds the
 * link for a period, so each page keeps its own filters in the URL.
 */
export function PeriodNav(props: { unit: PeriodUnit; date: string; units?: PeriodUnit[]; href: (unit: PeriodUnit, date: string) => string }) {
  const units = props.units ?? ["day", "week", "month"];
  const r = periodRange(props.unit, props.date);
  const base = props.href(props.unit, "DATE");
  return (
    <div class="toolbar">
      {units.length > 1 && (
        <select class="unit" aria-label="Periode" onchange="location=this.value">
          {units.map((u) => (
            <option value={props.href(u, props.date)} selected={u === props.unit}>
              {UNIT_LABELS[u]}
            </option>
          ))}
        </select>
      )}
      <span class="period">
        <a href={props.href(props.unit, r.prev)} aria-label="Forrige">
          <Icon name="left" size={16} />
        </a>
        <label>
          <Icon name="calendar" size={16} />
          {r.label}
          <input
            type={props.unit === "month" || props.unit === "year" ? "month" : "date"}
            value={props.unit === "month" || props.unit === "year" ? props.date.slice(0, 7) : props.date}
            onchange={`if(this.value)location=${JSON.stringify(base)}.replace('DATE',this.value.length===7?this.value+'-01':this.value)`}
          />
        </label>
        <a href={props.href(props.unit, r.next)} aria-label="Neste">
          <Icon name="right" size={16} />
        </a>
      </span>
    </div>
  );
}

/** Links and inputs for a GET filter form: each select submits on change. */
export function FilterSelect(props: { name: string; value: string; all: string; options: [string, string][] }) {
  return (
    <select name={props.name} onchange="this.form.submit()">
      <option value="">{props.all}</option>
      {props.options.map(([v, l]) => (
        <option value={v} selected={v === props.value}>
          {l}
        </option>
      ))}
    </select>
  );
}

export function SettingsTitle(props: { icon: string; title: string; sub: string }) {
  return (
    <>
      <div class="settings-title">
        <span class="ico">
          <Icon name={props.icon} />
        </span>
        <h2>{props.title}</h2>
      </div>
      <p class="settings-sub">{props.sub}</p>
    </>
  );
}
