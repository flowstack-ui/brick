import {
  Calendar,
  DatePicker,
  Frame,
  HStack,
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
export function DatePickerHeaderLayout() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
      >
        <DatePicker.Label>Custom header</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput placeholder="mm/dd/yyyy" />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger />
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Custom header calendar">
            <DatePicker.Calendar>
              <Calendar.Header>
                <Calendar.RangeText />
                <HStack gap={1}>
                  <Calendar.PrevTrigger />
                  <Calendar.NextTrigger />
                </HStack>
              </Calendar.Header>
              <Calendar.Grid />
            </DatePicker.Calendar>
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
