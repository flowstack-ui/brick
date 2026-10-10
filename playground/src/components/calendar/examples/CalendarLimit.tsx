import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarLimit() {
  return (
    <Calendar.Root
      referenceDate={date}
      selectionMode="multiple"
      maxSelectedDates={3}
      tone="contrast"
      aria-label="Choose up to three dates"
    />
  );
}
