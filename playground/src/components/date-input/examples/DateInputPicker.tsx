import { DatePicker, Frame, parseDate } from "@flowstack-ui/brick";
export function DateInputPicker() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root referenceDate={parseDate("2026-09-18")}>
        <DatePicker.Label>Appointment</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger />
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Appointment calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
