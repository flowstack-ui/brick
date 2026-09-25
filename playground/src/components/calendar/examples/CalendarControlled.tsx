import { useState } from "react";
import {
  Calendar,
  Stack,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const date = parseDate("2026-09-18");
export function CalendarControlled() {
  const [value, setValue] = useState<DateValue | null>(date);
  return (
    <Stack gap={3} align="start">
      <Text role="status">Selected: {value?.toString() ?? "None"}</Text>
      <Calendar.Root
        referenceDate={date}
        value={value}
        onValueChange={setValue}
        tone="contrast"
        aria-label="Controlled date"
      />
    </Stack>
  );
}
