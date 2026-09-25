import {
  DatePicker,
  Frame,
  Icon,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
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
export function DatePickerInputGroup() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={parseDate("2026-09-18")}
        entryMode="text"
        textCodec={codec}
      >
        <DatePicker.Label>Event date</DatePicker.Label>
        <DatePicker.Control>
          <Icon size="sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
          </Icon>
          <DatePicker.TextInput placeholder="mm/dd/yyyy" />
          <DatePicker.Trigger>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m8 9 4-4 4 4m-8 6 4 4 4-4" />
            </svg>
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Event date calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
