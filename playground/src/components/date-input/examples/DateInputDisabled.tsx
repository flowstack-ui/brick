import { DateInput, Frame, parseDate } from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DateInputDisabled() {
  return (
    <Frame maxInlineSize="24rem">
      <DateInput.Root
        referenceDate={referenceDate}
        disabled
        defaultValue={referenceDate}
      >
        <DateInput.Label>Appointment date</DateInput.Label>
        <DateInput.Control>
          <DateInput.SegmentGroup>
            <DateInput.Segments />
          </DateInput.SegmentGroup>
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </Frame>
  );
}
