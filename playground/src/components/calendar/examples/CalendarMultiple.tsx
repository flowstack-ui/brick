import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarMultiple() {
  return (
    <Calendar.Root
      referenceDate={date}
      selectionMode="multiple"
      tone="contrast"
      aria-label="Meeting days"
    />
  );
}
