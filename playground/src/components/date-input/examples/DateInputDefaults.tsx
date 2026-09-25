import {
  Button,
  DateInput,
  Frame,
  Stack,
  parseDate,
} from "@flowstack-ui/brick";
export function DateInputDefaults() {
  const date = parseDate("2026-09-18");
  return (
    <Frame maxInlineSize="28rem">
      <Stack gap={4}>
        <DateInput.PropsProvider
          size={{ initial: "md", lg: "lg" }}
          variant={{ initial: "outline", lg: "surface" }}
        >
          <DateInput.Root
            referenceDate={date}
            defaultPlaceholderValue={date.add({ months: 1 })}
          >
            <DateInput.Label>Review date</DateInput.Label>
            <DateInput.Control>
              <DateInput.SegmentGroup>
                <DateInput.Segments />
              </DateInput.SegmentGroup>
              <DateInput.ClearTrigger asChild>
                <Button size="sm" variant="ghost">
                  Clear
                </Button>
              </DateInput.ClearTrigger>
            </DateInput.Control>
            <DateInput.HiddenInput />
          </DateInput.Root>
        </DateInput.PropsProvider>
      </Stack>
    </Frame>
  );
}
