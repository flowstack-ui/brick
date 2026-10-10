import { useState } from "react";
import {
  Button,
  DateInput,
  Frame,
  HStack,
  Stack,
  parseZonedDateTime,
} from "@flowstack-ui/brick";
const referenceDate = parseZonedDateTime(
  "2026-09-18T14:30:00[America/New_York]",
);
export function DateInputTimeZone() {
  const [hourCycle, setHourCycle] = useState<12 | 24>(12);
  const [hideTimeZone, setHideTimeZone] = useState(false);
  return (
    <Frame maxInlineSize="36rem">
      <Stack gap={4}>
        <DateInput.Root
          referenceDate={referenceDate}
          defaultValue={referenceDate}
          timeZone="America/New_York"
          granularity="minute"
          hourCycle={hourCycle}
          hideTimeZone={hideTimeZone}
          aria-label="Zoned date"
        />
        <HStack gap={2}>
          <Button
            variant="outline"
            aria-pressed={hourCycle === 24}
            onClick={() => setHourCycle(hourCycle === 12 ? 24 : 12)}
          >
            24-hour clock
          </Button>
          <Button
            variant="outline"
            aria-pressed={hideTimeZone}
            onClick={() => setHideTimeZone(!hideTimeZone)}
          >
            Hide time zone
          </Button>
        </HStack>
      </Stack>
    </Frame>
  );
}
