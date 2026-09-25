import { DatePicker, Frame, parseDate } from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DatePickerSegmented() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root referenceDate={referenceDate} name="appointment">
        <DatePicker.Label>Appointment</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.ClearTrigger />
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
