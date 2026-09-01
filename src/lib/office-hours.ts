export const officeTimezoneIana = "America/Los_Angeles";
export const officeTimezoneLabel = "Pacific Time";
export const officeHoursWeekdays = "Monday–Friday, 8:00 AM – 5:00 PM";

export function formatOfficeHours(
  weekdays = officeHoursWeekdays,
  timezone = officeTimezoneLabel,
) {
  if (new RegExp(timezone.replace(/\s+/g, "\\s+"), "i").test(weekdays)) {
    return weekdays;
  }

  return `${weekdays} ${timezone}`;
}
