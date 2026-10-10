import { Calendar, parseDate } from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarDefaultValue() {
  return (
    <Calendar.Root
      referenceDate={date}
      defaultValue={date.add({ days: 3 })}
      tone="contrast"
      aria-label="Initial review date"
    />
  );
}
