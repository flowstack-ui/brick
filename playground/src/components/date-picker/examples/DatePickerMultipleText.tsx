import { DatePicker, Frame, parseDate } from "@flowstack-ui/brick";
export function DatePickerMultipleText() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={parseDate("2026-09-18")}
        entryMode="text"
        selectionMode="multiple"
        maxSelectedDates={4}
        name="typedMeetings"
      >
        <DatePicker.Label>Typed meeting dates</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput />
          <DatePicker.Trigger />
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Typed meetings calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
