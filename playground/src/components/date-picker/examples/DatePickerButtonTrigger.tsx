import { Frame, Button, DatePicker, parseDate } from "@flowstack-ui/brick";
export function DatePickerButtonTrigger() {
  return (
    <Frame inlineSize="fit-content" maxInlineSize="100%">
      <DatePicker.Root referenceDate={parseDate("2026-09-18")} entryMode="none">
        <DatePicker.Label>Review date</DatePicker.Label>
        <DatePicker.Trigger asChild>
          <Button variant="outline">
            <DatePicker.ValueText placeholder="Select date" />
          </Button>
        </DatePicker.Trigger>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Review date calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
