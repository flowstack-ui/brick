import {
  DateInput,
  DateFormatter,
  Frame,
  Stack,
  Text,
  parseZonedDateTime,
} from "@flowstack-ui/brick";
const appointment = parseZonedDateTime("2026-09-18T14:30:45[America/New_York]");
const timeFormatter = new DateFormatter("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/New_York",
});
export function DateInputTime() {
  return (
    <Frame maxInlineSize="32rem">
      <Stack gap={4}>
        <DateInput.Root
          referenceDate={appointment}
          defaultValue={appointment}
          granularity="second"
          timeZone="America/New_York"
          hourCycle={24}
          name="appointment"
          aria-label="Appointment date and time"
        />
        <DateInput.Root
          referenceDate={appointment}
          defaultValue={appointment}
          formatter={timeFormatter}
          granularity="minute"
          timeZone="America/New_York"
          hourCycle={24}
          name="time"
          aria-label="Appointment time"
        />
        <Text variant="body-sm">
          Time-only display still submits the complete dated, zoned value.
        </Text>
      </Stack>
    </Frame>
  );
}
