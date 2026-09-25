import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarNumberedWeeks() {
  return (
    <Calendar.Root
      referenceDate={date}
      showWeekNumbers
      tone="contrast"
      aria-label="Week numbers"
    />
  );
}
