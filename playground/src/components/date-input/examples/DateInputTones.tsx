import { DateInput, Frame, Stack, parseDate } from "@flowstack-ui/brick";
export function DateInputTones() {
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        {(["neutral", "accent"] as const).map((tone) => (
          <DateInput.Root
            key={tone}
            tone={tone}
            referenceDate={parseDate("2026-09-18")}
          >
            <DateInput.Label>{tone}</DateInput.Label>
            <DateInput.Control>
              <DateInput.SegmentGroup>
                <DateInput.Segments />
              </DateInput.SegmentGroup>
            </DateInput.Control>
          </DateInput.Root>
        ))}
      </Stack>
    </Frame>
  );
}
