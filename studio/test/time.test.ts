import { describe, expect, it } from "vitest";

import { addDays, businessDate, isoWeekday, localTime, osloToUtc } from "../src/lib/time";

describe("Oslo time", () => {
  it("converts wall-clock to UTC in winter and summer", () => {
    expect(osloToUtc("2026-01-15", "11:00").toISOString()).toBe("2026-01-15T10:00:00.000Z");
    expect(osloToUtc("2026-07-15", "11:00").toISOString()).toBe("2026-07-15T09:00:00.000Z");
  });

  it("handles the DST switch days", () => {
    expect(osloToUtc("2026-03-29", "11:00").toISOString()).toBe("2026-03-29T09:00:00.000Z");
    expect(osloToUtc("2026-10-25", "11:00").toISOString()).toBe("2026-10-25T10:00:00.000Z");
  });

  it("uses the Oslo date for late-evening UTC instants", () => {
    expect(businessDate("2026-06-30T22:30:00Z")).toBe("2026-07-01");
    expect(localTime("2026-06-30T22:30:00Z")).toBe("00:30");
  });

  it("computes weekdays and adds days across months", () => {
    expect(isoWeekday("2026-10-12")).toBe(1);
    expect(isoWeekday("2026-10-18")).toBe(7);
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
  });
});
