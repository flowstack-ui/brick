import {
  Button,
  DatePicker,
  Frame,
  Grid,
  Stack,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
const month = referenceDate.set({ day: 1 });
const year = referenceDate.set({ month: 1, day: 1 });
const presets = [
  {
    label: "Last 7 days",
    start: referenceDate.subtract({ days: 6 }),
    end: referenceDate,
  },
  {
    label: "Last 30 days",
    start: referenceDate.subtract({ days: 29 }),
    end: referenceDate,
  },
  {
    label: "This month",
    start: month,
    end: month.add({ months: 1 }).subtract({ days: 1 }),
  },
  {
    label: "Last month",
    start: month.subtract({ months: 1 }),
    end: month.subtract({ days: 1 }),
  },
  {
    label: "This year",
    start: year,
    end: year.add({ years: 1 }).subtract({ days: 1 }),
  },
  {
    label: "Last year",
    start: year.subtract({ years: 1 }),
    end: year.subtract({ days: 1 }),
  },
];
const codec = {
  format: (date: DateValue) =>
    `${String(date.month).padStart(2, "0")}/${String(date.day).padStart(2, "0")}/${date.year}`,
  parse: (text: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return undefined;
    const [month, day, year] = text.split("/");
    const iso = `${year}-${month}-${day}`;
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerPresets() {
  return (
    <Frame maxInlineSize="32rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        selectionMode="range"
        name="reportPeriod"
        positioning={{
          placement: "bottom-start",
          flip: ["top-start"],
          slide: true,
        }}
      >
        <DatePicker.Label>Report period</DatePicker.Label>
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            sm: "minmax(0, 1fr) minmax(0, 1fr)",
          }}
          gap={2}
        >
          <DatePicker.Control>
            <DatePicker.TextInput index={0} placeholder="mm/dd/yyyy" />
          </DatePicker.Control>
          <DatePicker.Control>
            <DatePicker.TextInput index={1} placeholder="mm/dd/yyyy" />
            <DatePicker.Trigger />
          </DatePicker.Control>
        </Grid.Root>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Report period calendar">
            <Grid.Root
              templateColumns={{
                initial: "minmax(0, 1fr)",
                sm: "auto minmax(0, 1fr)",
              }}
              gap={4}
            >
              <Stack gap={2}>
                {presets.map(({ label, start, end }) => (
                  <DatePicker.PresetTrigger
                    key={label}
                    value={{ start, end }}
                    asChild
                  >
                    <Button variant="surface" tone="neutral" size="sm">
                      {label}
                    </Button>
                  </DatePicker.PresetTrigger>
                ))}
              </Stack>
              <DatePicker.Calendar />
            </Grid.Root>
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
