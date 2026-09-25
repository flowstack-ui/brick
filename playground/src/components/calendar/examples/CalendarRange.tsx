import { Calendar, parseDate } from "@flowstack-ui/brick";
export function CalendarRange() {
  return (
    <Calendar.Root
      referenceDate={parseDate("2026-09-18")}
      selectionMode="range"
      numOfMonths={2}
      defaultValue={{
        start: parseDate("2026-09-21"),
        end: parseDate("2026-09-25"),
      }}
      aria-label="Travel dates"
    />
  );
}
