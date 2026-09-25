import { useState } from "react";
import {
  DateInput,
  Frame,
  NativeSelect,
  Stack,
  parseZonedDateTime,
} from "@flowstack-ui/brick";
const referenceDate = parseZonedDateTime(
  "2026-09-18T14:30:45[America/New_York]",
);
export function DateInputGranularity() {
  const [granularity, setGranularity] = useState<
    "day" | "hour" | "minute" | "second"
  >("minute");
  return (
    <Frame maxInlineSize="32rem">
      <Stack gap={4}>
        <NativeSelect.Root>
          <NativeSelect.Field
            aria-label="Granularity"
            value={granularity}
            onChange={(event) =>
              setGranularity(event.target.value as typeof granularity)
            }
          >
            {(["day", "hour", "minute", "second"] as const).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <DateInput.Root
          referenceDate={referenceDate}
          defaultValue={referenceDate}
          granularity={granularity}
          hideTimeZone
          timeZone="America/New_York"
          aria-label="Appointment precision"
        />
      </Stack>
    </Frame>
  );
}
