import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarUnavailable() {
  return (
    <Calendar.Root
      referenceDate={date}
      isDateUnavailable={(value) => value.day === 20 || value.day === 21}
      tone="contrast"
      aria-label="Available dates"
    />
  );
}
