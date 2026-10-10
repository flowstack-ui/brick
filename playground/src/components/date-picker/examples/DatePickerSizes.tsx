import {
  DatePicker,
  Frame,
  Stack,
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
export function DatePickerSizes() {
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
          <DatePicker.Root
            key={size}
            size={size}
            entryMode="text"
            textCodec={codec}
            referenceDate={parseDate("2026-09-18")}
          >
            <DatePicker.Label>{size}</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.TextInput placeholder="mm/dd/yyyy" />
              <DatePicker.Trigger />
            </DatePicker.Control>
            <DatePicker.Portal>
              <DatePicker.Content aria-label={size + " calendar"}>
                <DatePicker.Calendar />
              </DatePicker.Content>
            </DatePicker.Portal>
          </DatePicker.Root>
        ))}
      </Stack>
    </Frame>
  );
}
