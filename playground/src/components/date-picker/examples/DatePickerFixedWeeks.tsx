import {
  Calendar,
  DatePicker,
  Frame,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
const codec = {
  format: (date: DateValue) =>
    [
      String(date.month).padStart(2, "0"),
      String(date.day).padStart(2, "0"),
      date.year,
    ].join("/"),
  parse: (text: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return undefined;
    const [month, day, year] = text.split("/");
    const iso = year + "-" + month + "-" + day;
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerFixedWeeks() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        fixedWeeks
      >
        <DatePicker.Label>Fixed-height calendar</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput placeholder="mm/dd/yyyy" />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger />
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Fixed-height calendar calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
