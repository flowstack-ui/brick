import { Calendar, HStack, parseDate } from "@flowstack-ui/brick";
export function CalendarPeriods() {
  return (
    <HStack align="start" gap={6} wrap>
      <Calendar.Root
        referenceDate={parseDate("2026-09-18")}
        minView="month"
        defaultView="month"
        aria-label="Billing month"
      />
      <Calendar.Root
        referenceDate={parseDate("2026-09-18")}
        minView="year"
        defaultView="year"
        aria-label="Financial year"
      />
    </HStack>
  );
}
