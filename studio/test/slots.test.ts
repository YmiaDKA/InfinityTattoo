import { describe, expect, it } from "vitest";

import { freeSlots } from "../src/lib/slots";

const hours = [{ weekday: 2, start_time: "11:00", end_time: "13:00" }]; // Tuesday
const now = new Date("2026-10-01T00:00:00Z");

describe("freeSlots", () => {
  it("lists slots within working hours", () => {
    const slots = freeSlots({ date: "2026-10-13", durationMin: 60, hours, busy: [], now });
    expect(slots).toEqual(["2026-10-13T09:00:00.000Z", "2026-10-13T09:30:00.000Z", "2026-10-13T10:00:00.000Z"]);
  });

  it("skips days without working hours", () => {
    expect(freeSlots({ date: "2026-10-12", durationMin: 30, hours, busy: [], now })).toEqual([]);
  });

  it("removes slots that overlap bookings", () => {
    const busy = [{ starts_at: "2026-10-13T09:30:00.000Z", ends_at: "2026-10-13T10:00:00.000Z" }];
    const slots = freeSlots({ date: "2026-10-13", durationMin: 30, hours, busy, now });
    expect(slots).toEqual(["2026-10-13T09:00:00.000Z", "2026-10-13T10:00:00.000Z", "2026-10-13T10:30:00.000Z"]);
  });

  it("respects minimum notice", () => {
    const soon = new Date("2026-10-13T00:00:00Z");
    expect(freeSlots({ date: "2026-10-13", durationMin: 30, hours, busy: [], now: soon })).toEqual([]);
  });
});

describe("freeSlots buffer", () => {
  it("keeps cleanup time free around other bookings", () => {
    const hours = [{ weekday: 2, start_time: "11:00", end_time: "14:00" }];
    // Tuesday 2026-10-13; an existing booking 12:00–12:30 Oslo (10:00–10:30Z).
    const busy = [{ starts_at: "2026-10-13T10:00:00.000Z", ends_at: "2026-10-13T10:30:00.000Z" }];
    const now = new Date("2026-10-01T00:00:00Z");
    const without = freeSlots({ date: "2026-10-13", durationMin: 30, hours, busy, now });
    const withBuffer = freeSlots({ date: "2026-10-13", durationMin: 30, hours, busy, now, bufferMin: 15 });
    expect(without).toContain("2026-10-13T09:30:00.000Z");
    expect(without).toContain("2026-10-13T10:30:00.000Z");
    expect(withBuffer).not.toContain("2026-10-13T09:30:00.000Z");
    expect(withBuffer).not.toContain("2026-10-13T10:30:00.000Z");
    expect(withBuffer).toContain("2026-10-13T11:00:00.000Z");
  });
});
