import {
  Calendar,
  DatePicker,
  Frame,
  LocaleProvider,
  parseDate,
} from "@flowstack-ui/brick";
export function DatePickerLocale() {
  return (
    <Frame maxInlineSize="24rem">
      <LocaleProvider
        locale="ar-EG"
        localeText={{ chooseDate: "اختر التاريخ", clearDate: "مسح التاريخ" }}
      >
        <DatePicker.Root
          referenceDate={parseDate("2026-09-18")}
          defaultValue={parseDate("2026-09-21")}
        >
          <DatePicker.Label>تاريخ المراجعة</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.Trigger />
          </DatePicker.Control>
          <DatePicker.Portal>
            <DatePicker.Content aria-label="التقويم">
              <DatePicker.Calendar>
                <Calendar.Header>
                  <Calendar.PrevTrigger aria-label="السابق" />
                  <Calendar.ViewTrigger />
                  <Calendar.NextTrigger aria-label="التالي" />
                </Calendar.Header>
                <Calendar.Grid />
              </DatePicker.Calendar>
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.Root>
      </LocaleProvider>
    </Frame>
  );
}
