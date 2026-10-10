import {
  DatePicker,
  Frame,
  LocaleProvider,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const codec = {
  format: (date: DateValue) =>
    [
      String(date.day).padStart(2, "0"),
      String(date.month).padStart(2, "0"),
      date.year,
    ].join("."),
  parse: (text: string) => {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(text)) return undefined;
    const [day, month, year] = text.split(".");
    const iso = year + "-" + month + "-" + day;
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerLocalization() {
  return (
    <Frame maxInlineSize="24rem">
      <LocaleProvider locale="de-DE">
        <DatePicker.Root
          referenceDate={parseDate("2026-09-18")}
          entryMode="text"
          textCodec={codec}
        >
          <DatePicker.Label>Datum auswählen</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.TextInput placeholder="dd.mm.yyyy" />
            <DatePicker.Trigger aria-label="Datum wählen" />
          </DatePicker.Control>
          <DatePicker.Portal>
            <DatePicker.Content aria-label="Kalender">
              <DatePicker.Calendar />
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.Root>
      </LocaleProvider>
    </Frame>
  );
}
