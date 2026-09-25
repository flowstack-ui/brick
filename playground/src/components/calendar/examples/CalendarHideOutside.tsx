import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarHideOutside() {
  return (
    <Calendar.Root
      referenceDate={date}
      tone="contrast"
      aria-label="Current month dates"
    >
      <Calendar.Header>
        <Calendar.PrevTrigger />
        <Calendar.ViewTrigger />
        <Calendar.NextTrigger />
      </Calendar.Header>
      <Calendar.Grid hideOutsideDays />
    </Calendar.Root>
  );
}
