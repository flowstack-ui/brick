import { useState } from "react";
import {
  DateInput,
  Frame,
  Stack,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DateInputControlled() {
  const [value, setValue] = useState<DateValue | null>(referenceDate);
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={3}>
        <DateInput.Root
          referenceDate={referenceDate}
          value={value}
          onValueChange={setValue}
          aria-label="Controlled date"
        />
        <Text variant="body-sm" role="status">
          {value?.toString() ?? "No date selected"}
        </Text>
      </Stack>
    </Frame>
  );
}
