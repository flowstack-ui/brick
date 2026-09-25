import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarBounds() {
  return (
    <Calendar.Root
      referenceDate={date}
      min={date}
      max={date.add({ days: 14 })}
      tone="contrast"
      aria-label="Delivery window"
    />
  );
}
