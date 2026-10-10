import { DateInput, Frame, parseDate } from "@flowstack-ui/brick";
export function DateInputBasic() {
  return (
    <Frame maxInlineSize="24rem">
      <DateInput.Root
        referenceDate={parseDate("2026-09-18")}
        name="appointment"
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
