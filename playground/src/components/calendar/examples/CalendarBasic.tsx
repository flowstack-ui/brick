import { Calendar, parseDate } from "@flowstack-ui/brick";
export function CalendarBasic() {
  return (
    <Calendar.Root
      tone="contrast"
      referenceDate={parseDate("2026-09-18")}
      defaultValue={parseDate("2026-09-21")}
      aria-label="Review date"
    />
  );
}
