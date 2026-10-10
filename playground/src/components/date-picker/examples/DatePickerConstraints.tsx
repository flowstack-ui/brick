import { DatePicker, Frame, parseDate } from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DatePickerConstraints() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        min={referenceDate}
        max={referenceDate.add({ days: 14 })}
        isDateUnavailable={(date) => [20, 27].includes(date.day)}
      >
        <DatePicker.Label>Delivery window</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput />
          <DatePicker.IndicatorGroup>
            <DatePicker.ClearTrigger />
            <DatePicker.Trigger />
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Delivery window calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
