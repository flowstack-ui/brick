import {
  DatePicker,
  Frame,
  parseDate,
  toCalendarDate,
  type DateValue,
} from "@flowstack-ui/brick";
const codec = {
  format: (date: DateValue) =>
    toCalendarDate(date).toString().split("-").reverse().join("/"),
  parse: (text: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return undefined;
    const [day, month, year] = text.split("/");
    const iso = year + "-" + month + "-" + day;
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerCodec() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={parseDate("2026-09-18")}
        entryMode="text"
        textCodec={codec}
      >
        <DatePicker.Label>Review date (DD/MM/YYYY)</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput placeholder="DD/MM/YYYY" />
          <DatePicker.Trigger />
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Review calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
