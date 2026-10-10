import { Calendar, LocaleProvider, parseDate } from "@flowstack-ui/brick";
export function CalendarLocale() {
  return (
    <LocaleProvider locale="ar-EG">
      <Calendar.Root
        referenceDate={parseDate("2026-09-18")}
        defaultValue={parseDate("2026-09-21")}
        aria-label="تاريخ المراجعة"
      />
    </LocaleProvider>
  );
}
