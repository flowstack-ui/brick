import { useState } from "react";
import {
  Button,
  DateInput,
  Frame,
  HStack,
  Stack,
  Text,
  parseDate,
} from "@flowstack-ui/brick";
export function DateInputForm() {
  const [result, setResult] = useState("No submission");
  return (
    <Frame maxInlineSize="24rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(String(new FormData(event.currentTarget).get("date")));
        }}
      >
        <Stack gap={4}>
          <DateInput.Root
            referenceDate={parseDate("2026-09-18")}
            name="date"
            required
            aria-label="Required review date"
          />
          <HStack gap={2}>
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text role="status" variant="body-sm">
            {result}
          </Text>
        </Stack>
      </form>
    </Frame>
  );
}
