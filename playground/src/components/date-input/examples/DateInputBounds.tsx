import { DateInput, Frame, parseDate } from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DateInputBounds() {
  return (
    <Frame maxInlineSize="24rem">
      <DateInput.Root
        referenceDate={referenceDate}
        min={parseDate("2026-09-01")}
        max={parseDate("2026-09-30")}
        defaultValue={referenceDate}
      >
        <DateInput.Label>September appointment</DateInput.Label>
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
