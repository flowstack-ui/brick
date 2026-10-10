import { useState } from "react";
import {
  Button,
  Calendar,
  Center,
  Divider,
  Frame,
  Grid,
  ScrollArea,
  Stack,
  Surface,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";

const referenceDate = parseDate("2026-09-18");
const weekday = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  timeZone: "UTC",
});
const monthDay = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const isWeekend = (date: DateValue) =>
  [0, 6].includes(date.toDate("UTC").getUTCDay());

function availableTimes(date: DateValue) {
  const endHour = date.toDate("UTC").getUTCDay() === 5 ? 14 : 17;
  return Array.from(
    { length: (endHour - 9) * 2 },
    (_, index) =>
      `${String(9 + Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`,
  ).filter((_, index) => (index + date.day + date.month) % 5 !== 0);
}

export function CalendarBooking() {
  const [date, setDate] = useState<DateValue | null>(null);
  const [time, setTime] = useState<string | null>(null);
  return (
    <Frame maxInlineSize="34rem">
      <Surface bordered level="transparent">
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            md: "auto auto minmax(15rem, 1fr)",
          }}
          gap={0}
        >
          <Stack gap={0}>
            <Surface level="transparent" inset="md">
              <Stack gap={0}>
                <Text variant="body-lg" weight="semibold">
                  Select a date
                </Text>
                <Text variant="body-sm" tone="secondary">
                  Pick a day for your meeting
                </Text>
              </Stack>
            </Surface>
            <Calendar.Root
              referenceDate={referenceDate}
              value={date}
              onValueChange={(value) => {
                setDate(value);
                setTime(null);
              }}
              isDateUnavailable={isWeekend}
              tone="contrast"
              aria-label="Meeting date"
            >
              <Calendar.Header>
                <Calendar.PrevTrigger />
                <Calendar.RangeText />
                <Calendar.NextTrigger />
              </Calendar.Header>
              <Calendar.DayTable />
            </Calendar.Root>
            <Surface level="transparent" inset="md">
              <Text variant="caption" tone="secondary">
                Times shown in UTC
              </Text>
            </Surface>
          </Stack>
          <Divider
            orientation={{ initial: "horizontal", md: "vertical" }}
            stretch
          />
          {date ? (
            <Stack gap={0}>
              <Surface level="transparent" inset="md">
                <Stack gap={0}>
                  <Text weight="semibold">
                    {weekday.format(date.toDate("UTC"))}
                  </Text>
                  <Text variant="body-sm" tone="secondary" role="status">
                    {monthDay.format(date.toDate("UTC"))}
                    {time ? ` at ${time} UTC` : ""}
                  </Text>
                </Stack>
              </Surface>
              <Surface level="transparent" inset="sm">
                <Frame blockSize="22rem" asChild>
                  <ScrollArea.Root>
                    <ScrollArea.Viewport>
                      <Stack gap={2}>
                        {availableTimes(date).map((slot) => (
                          <Button
                            key={slot}
                            size="sm"
                            tone="contrast"
                            variant={time === slot ? "solid" : "outline"}
                            aria-pressed={time === slot}
                            onClick={() => setTime(time === slot ? null : slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </Stack>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                      <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                </Frame>
              </Surface>
            </Stack>
          ) : (
            <Center>
              <Surface level="transparent" inset="md">
                <Stack align="center" gap={1}>
                  <Text variant="body-sm" weight="medium" tone="secondary">
                    Select a date
                  </Text>
                  <Text variant="caption" tone="secondary" align="center">
                    Available time slots will appear here
                  </Text>
                </Stack>
              </Surface>
            </Center>
          )}
        </Grid.Root>
      </Surface>
    </Frame>
  );
}
