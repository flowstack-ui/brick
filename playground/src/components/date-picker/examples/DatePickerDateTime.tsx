import { useState } from "react";
import {
  Frame,
  Button,
  DateFormatter,
  DateInput,
  DatePicker,
  Stack,
  parseZonedDateTime,
  type DateValue,
} from "@flowstack-ui/brick";
const referenceDate = parseZonedDateTime("2026-09-18T14:30[America/New_York]");
const timeFormatter = new DateFormatter("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h12",
  timeZone: "America/New_York",
});
export function DatePickerDateTime() {
  const [value, setValue] = useState<DateValue | null>(referenceDate);
  return (
    <Frame inlineSize="fit-content" maxInlineSize="100%">
      <DatePicker.Root
        referenceDate={referenceDate}
        value={value}
        onValueChange={setValue}
        entryMode="none"
        name="appointment"
        timeZone="America/New_York"
        closeOnSelect={false}
      >
        <DatePicker.Label>Date and time</DatePicker.Label>
        <DatePicker.Trigger asChild>
          <Button variant="outline">
            <DatePicker.ValueText placeholder="Choose appointment" />
            {value
              ? " · " + timeFormatter.format(value.toDate("America/New_York"))
              : ""}
          </Button>
        </DatePicker.Trigger>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Appointment calendar">
            <Stack gap={3}>
              <DatePicker.Calendar />
              <DateInput.Root
                referenceDate={referenceDate}
                value={value}
                onValueChange={setValue}
                formatter={timeFormatter}
                hourCycle={12}
                hideTimeZone
                timeZone="America/New_York"
                granularity="minute"
                aria-label="Appointment time"
              />
            </Stack>
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
