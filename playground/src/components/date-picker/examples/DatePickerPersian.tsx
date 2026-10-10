import {
  DatePicker,
  Frame,
  LocaleProvider,
  createCalendar,
  parseDate,
  toCalendar,
} from "@flowstack-ui/brick";
const referenceDate = toCalendar(
  parseDate("2026-09-18"),
  createCalendar("persian"),
);
export function DatePickerPersian() {
  return (
    <Frame maxInlineSize="24rem">
      <LocaleProvider locale="fa-IR">
        <DatePicker.Root
          referenceDate={referenceDate}
          defaultValue={referenceDate}
          locale="fa-IR-u-ca-persian"
          createCalendar={createCalendar}
        >
          <DatePicker.Label>تاریخ</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.Trigger aria-label="انتخاب تاریخ" />
          </DatePicker.Control>
          <DatePicker.Portal>
            <DatePicker.Content aria-label="تقویم">
              <DatePicker.Calendar />
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.Root>
      </LocaleProvider>
    </Frame>
  );
}
