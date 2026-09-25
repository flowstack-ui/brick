import {
  Button,
  Calendar,
  DatePicker,
  Divider,
  Frame,
  Grid,
  HStack,
  Stack,
  Surface,
  Text,
  parseDate,
  useLocaleContext,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
const presets = [
  ["Today", 0],
  ["Tomorrow", 1],
  ["Next week", 7],
  ["2 weeks", 14],
  ["4 weeks", 28],
] as const;
export function DatePickerPresetsSidebar() {
  const { locale } = useLocaleContext();
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  });
  return (
    <Frame inlineSize="fit-content" maxInlineSize="100%">
      <Surface bordered level="transparent" radius="none" inset="none">
        <DatePicker.Root
          referenceDate={referenceDate}
          entryMode="none"
          fixedWeeks
          closeOnSelect={false}
          defaultValue={referenceDate.add({ days: 14 })}
        >
          <Grid.Root
            templateColumns={{
              initial: "minmax(0, 1fr)",
              sm: "auto auto minmax(0, 1fr)",
            }}
            gap={0}
          >
            <Frame inlineSize={{ initial: "100%", sm: "14rem" }}>
              <Stack gap={0}>
                {presets.map(([label, days]) => {
                  const date = referenceDate.add({ days });
                  return (
                    <DatePicker.Context key={label}>
                      {(picker) => (
                        <DatePicker.PresetTrigger value={date} asChild>
                          <Button
                            variant={
                              picker.formValues.some(
                                (value) => value.compare(date) === 0,
                              )
                                ? "subtle"
                                : "ghost"
                            }
                            tone="neutral"
                            size="md"
                            radius="none"
                            fullWidth
                            asChild
                          >
                            <button type="button">
                              <Frame inlineSize="100%">
                                <HStack gap={3} justify="between">
                                  <Text>{label}</Text>
                                  <Text tone="secondary">
                                    {(days < 2
                                      ? weekdayFormatter
                                      : formatter
                                    ).format(date.toDate("UTC"))}
                                  </Text>
                                </HStack>
                              </Frame>
                            </button>
                          </Button>
                        </DatePicker.PresetTrigger>
                      )}
                    </DatePicker.Context>
                  );
                })}
              </Stack>
            </Frame>
            <Divider
              orientation={{ initial: "horizontal", sm: "vertical" }}
              stretch
            />
            <DatePicker.Calendar tone="contrast">
              <Calendar.Header>
                <Calendar.RangeText />
                <HStack gap={1}>
                  <Calendar.PrevTrigger />
                  <Calendar.NextTrigger />
                </HStack>
              </Calendar.Header>
              <Calendar.DayTable />
            </DatePicker.Calendar>
          </Grid.Root>
        </DatePicker.Root>
      </Surface>
    </Frame>
  );
}
