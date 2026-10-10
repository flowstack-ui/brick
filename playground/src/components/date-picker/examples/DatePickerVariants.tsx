import {
  DatePicker,
  Frame,
  VStack,
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
const referenceDate = parseDate("2026-09-18");
export function DatePickerVariants() {
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="6">
        {(
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        ).map((variant) => (
          <DatePicker.Root
            key={variant}
            referenceDate={referenceDate}
            entryMode="text"
            textCodec={codec}
            variant={variant}
          >
            <DatePicker.Label>{variant}</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.TextInput placeholder="mm/dd/yyyy" />
              <DatePicker.Trigger />
            </DatePicker.Control>
            <DatePicker.Portal>
              <DatePicker.Content aria-label={`${variant} calendar`}>
                <DatePicker.Calendar />
              </DatePicker.Content>
            </DatePicker.Portal>
          </DatePicker.Root>
        ))}
      </VStack>
    </Frame>
  );
}
