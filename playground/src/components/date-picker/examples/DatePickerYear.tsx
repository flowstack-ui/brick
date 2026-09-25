import {
  DatePicker,
  Frame,
  parseDate,
  useLocaleContext,
  type DateValue,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
const codec = {
  format: (date: DateValue) => String(date.year),
  parse: (text: string) => {
    const match = /^(\d{4})$/.exec(text);
    if (!match) return undefined;
    const iso = match[1] + "-01-01";
    try {
      const value = parseDate(iso);
      return value.toString() === iso ? value : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerYear() {
  const { dir } = useLocaleContext();
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        name="year"
        minView="year"
        defaultView="year"
      >
        <DatePicker.Label>Choose year</DatePicker.Label>

        <DatePicker.Control>
          <DatePicker.TextInput placeholder="yyyy" />
          <DatePicker.Trigger />
        </DatePicker.Control>

        <DatePicker.Portal>
          <DatePicker.Content aria-label="Choose year calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
