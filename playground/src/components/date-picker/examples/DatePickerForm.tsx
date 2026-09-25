import { useState } from "react";
import {
  Button,
  DatePicker,
  Frame,
  HStack,
  Text,
  VStack,
  parseDate,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DatePickerForm() {
  const [submitted, setSubmitted] = useState("No date submitted");
  return (
    <Frame maxInlineSize="24rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(new FormData(event.currentTarget).get("delivery")),
          );
        }}
      >
        <VStack gap="4">
          <DatePicker.Root
            referenceDate={referenceDate}
            entryMode="text"
            name="delivery"
            required
          >
            <DatePicker.Label>Delivery date</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.TextInput />
              <DatePicker.Trigger />
            </DatePicker.Control>
            <DatePicker.Portal>
              <DatePicker.Content aria-label="Delivery date calendar">
                <DatePicker.Calendar />
              </DatePicker.Content>
            </DatePicker.Portal>
          </DatePicker.Root>
          <HStack gap="2">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text role="status">{submitted}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
