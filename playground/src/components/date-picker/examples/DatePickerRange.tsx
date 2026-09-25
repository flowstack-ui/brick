import {
  DatePicker,
  Frame,
  Grid,
  Hide,
  Show,
  Text,
  parseDate,
  useLocaleContext,
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
export function DatePickerRange() {
  const { dir } = useLocaleContext();
  return (
    <Frame maxInlineSize="32rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        selectionMode="range"
        name="trip"
      >
        <DatePicker.Label>Travel dates</DatePicker.Label>
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            sm: "minmax(0, 1fr) auto minmax(0, 1fr)",
          }}
          gap={2}
          align="center"
        >
          <DatePicker.Control>
            <DatePicker.TextInput index={0} placeholder="mm/dd/yyyy" />
          </DatePicker.Control>
          <Grid.Item aria-hidden="true">
            <Show from="sm">
              <Text>{dir === "rtl" ? "←" : "→"}</Text>
            </Show>
            <Hide from="sm">
              <Text>↓</Text>
            </Hide>
          </Grid.Item>
          <DatePicker.Control>
            <DatePicker.TextInput index={1} placeholder="mm/dd/yyyy" />
            <DatePicker.Trigger />
          </DatePicker.Control>
        </Grid.Root>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Travel dates calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
