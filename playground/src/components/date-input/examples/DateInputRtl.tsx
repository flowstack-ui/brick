import { DateInput, Frame, parseDate } from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DateInputRtl() {
  return (
    <Frame maxInlineSize="24rem">
      <DateInput.Root
        referenceDate={referenceDate}
        locale="ar-EG"
        dir="rtl"
        defaultValue={referenceDate}
      >
        <DateInput.Label>تاريخ الموعد</DateInput.Label>
        <DateInput.Control>
          <DateInput.SegmentGroup>
            <DateInput.Segments />
          </DateInput.SegmentGroup>
          <DateInput.ClearTrigger />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </Frame>
  );
}
