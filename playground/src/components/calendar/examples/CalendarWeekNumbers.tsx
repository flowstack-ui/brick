import { Calendar, parseDate } from "@flowstack-ui/brick";
export function CalendarWeekNumbers() {
  return (
    <Calendar.Root
      referenceDate={parseDate("2026-09-18")}
      showWeekNumbers
      fixedWeeks
      aria-label="Delivery week"
    >
      <Calendar.Header>
        <Calendar.PrevTrigger />
        <Calendar.MonthSelect />
        <Calendar.YearSelect />
        <Calendar.NextTrigger />
      </Calendar.Header>
      <Calendar.Grid weekdayFormat="short" hideOutsideDays />
    </Calendar.Root>
  );
}
