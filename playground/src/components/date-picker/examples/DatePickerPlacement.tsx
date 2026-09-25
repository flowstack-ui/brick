import { DatePicker, Frame, parseDate } from "@flowstack-ui/brick";
export function DatePickerPlacement() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root referenceDate={parseDate("2026-09-18")} entryMode="text">
        <DatePicker.Label>Start date</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput />
          <DatePicker.Trigger />
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content
            side="top"
            align="end"
            aria-label="Start date calendar"
          >
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
