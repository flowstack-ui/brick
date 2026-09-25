import {
  DateInput,
  DateFormatter,
  Frame,
  parseZonedDateTime,
} from "@flowstack-ui/brick";
const referenceDate = parseZonedDateTime(
  "2026-09-18T14:30:00[America/New_York]",
);
const formatter = new DateFormatter("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h12",
  timeZone: "America/New_York",
});
export function DateInputTimeOnly() {
  return (
    <Frame maxInlineSize="24rem">
      <DateInput.Root
        referenceDate={referenceDate}
        defaultValue={referenceDate}
        formatter={formatter}
        granularity="minute"
        hourCycle={12}
        timeZone="America/New_York"
        aria-label="Meeting time"
      />
    </Frame>
  );
}
