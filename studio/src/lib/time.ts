export const TIME_ZONE = "Europe/Oslo";

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function osloParts(date: Date) {
  const parts = Object.fromEntries(
    partsFormatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

/** Offset of Oslo from UTC at the given instant, in minutes (60 in winter, 120 in summer). */
function osloOffsetMinutes(date: Date): number {
  const p = osloParts(date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
}

/** YYYY-MM-DD in Oslo for an instant. */
export function businessDate(at: Date | string): string {
  const p = osloParts(typeof at === "string" ? new Date(at) : at);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

/** HH:MM in Oslo for an instant. */
export function localTime(at: Date | string): string {
  const p = osloParts(typeof at === "string" ? new Date(at) : at);
  return `${pad(p.hour)}:${pad(p.minute)}`;
}

/** Converts an Oslo wall-clock date + time to a UTC Date. */
export function osloToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  // Two passes handle the DST switch correctly for all real opening hours.
  let utc = guess - osloOffsetMinutes(new Date(guess)) * 60000;
  utc = guess - osloOffsetMinutes(new Date(utc)) * 60000;
  return new Date(utc);
}

/** ISO weekday for an Oslo date: 1 = Monday ... 7 = Sunday. */
export function isoWeekday(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return day === 0 ? 7 : day;
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function isDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
