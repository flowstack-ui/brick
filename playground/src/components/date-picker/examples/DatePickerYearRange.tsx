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
export function DatePickerYearRange() {
  const { dir } = useLocaleContext();
  return (
    <Frame maxInlineSize="32rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        selectionMode="range"
        name="yearrange"
        minView="year"
        defaultView="year"
      >
        <DatePicker.Label>Financial years</DatePicker.Label>
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            sm: "minmax(0, 1fr) auto minmax(0, 1fr)",
          }}
          gap={2}
          align="center"
        >
          <DatePicker.Control>
            <DatePicker.TextInput index={0} placeholder="yyyy" />
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
            <DatePicker.TextInput index={1} placeholder="yyyy" />
            <DatePicker.Trigger />
          </DatePicker.Control>
        </Grid.Root>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Financial years calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
