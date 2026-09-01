import assert from "node:assert/strict";
import { test } from "node:test";

import { formatOfficeHours, officeHoursWeekdays, officeTimezoneLabel } from "./office-hours.ts";

test("appends Pacific Time when the hours string has none", () => {
  assert.equal(
    formatOfficeHours(officeHoursWeekdays, officeTimezoneLabel),
    "Monday–Friday, 8:00 AM – 5:00 PM Pacific Time",
  );
});

test("does not invent a second timezone when Pacific Time is already present", () => {
  assert.equal(
    formatOfficeHours("Monday–Friday, 8:00 AM – 5:00 PM Pacific Time"),
    "Monday–Friday, 8:00 AM – 5:00 PM Pacific Time",
  );
});
