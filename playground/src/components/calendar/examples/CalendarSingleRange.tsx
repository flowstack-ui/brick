import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarSingleRange() {
  return (
    <Calendar.Root
      referenceDate={date}
      selectionMode="range"
      tone="contrast"
      aria-label="Travel period"
    />
  );
}
