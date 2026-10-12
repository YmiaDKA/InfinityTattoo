import { isoWeekday, osloToUtc } from "./time";

export type WorkingHours = { weekday: number; start_time: string; end_time: string };
export type Busy = { starts_at: string; ends_at: string };

export type SlotInput = {
  date: string; // YYYY-MM-DD, Oslo
  durationMin: number;
  hours: WorkingHours[];
  busy: Busy[]; // bookings and time off for this staff member (and studio-wide closures)
  now: Date;
  stepMin?: number;
  minNoticeMin?: number;
};

/** Free start times (UTC ISO) for one staff member on one day. */
export function freeSlots({
  date,
  durationMin,
  hours,
  busy,
  now,
  stepMin = 30,
  minNoticeMin = 12 * 60,
}: SlotInput): string[] {
  const weekday = isoWeekday(date);
  const earliest = now.getTime() + minNoticeMin * 60000;
  const duration = durationMin * 60000;
  const busyRanges = busy.map((b) => [Date.parse(b.starts_at), Date.parse(b.ends_at)] as const);
  const slots: string[] = [];

  for (const block of hours.filter((h) => h.weekday === weekday)) {
    const open = osloToUtc(date, block.start_time).getTime();
    const close = osloToUtc(date, block.end_time).getTime();
    for (let start = open; start + duration <= close; start += stepMin * 60000) {
      const end = start + duration;
      if (start < earliest) continue;
      if (busyRanges.some(([s, e]) => start < e && end > s)) continue;
      slots.push(new Date(start).toISOString());
    }
  }
  return slots;
}

export function overlaps(a: Busy, b: Busy): boolean {
  return Date.parse(a.starts_at) < Date.parse(b.ends_at) && Date.parse(a.ends_at) > Date.parse(b.starts_at);
}
