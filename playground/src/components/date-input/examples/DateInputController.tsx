import {
  Button,
  DateInput,
  Frame,
  HStack,
  Stack,
  Text,
  parseDate,
  useDateInput,
} from "@flowstack-ui/brick";
export function DateInputController() {
  const date = useDateInput({
    referenceDate: parseDate("2026-09-18"),
    defaultValue: parseDate("2026-09-21"),
  });
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        <DateInput.RootProvider value={date}>
          <DateInput.Label>Review date</DateInput.Label>
          <DateInput.Control>
            <DateInput.SegmentGroup>
              <DateInput.Segments />
            </DateInput.SegmentGroup>
            <DateInput.ClearTrigger />
          </DateInput.Control>
        </DateInput.RootProvider>
        <Text role="status" variant="body-sm">
          {date.value[0]?.toString() ?? "No date"}
        </Text>
        <HStack gap={2}>
          <Button variant="outline" onClick={() => date.focus()}>
            Focus date
          </Button>
          <Button variant="outline" onClick={() => date.clearValue()}>
            Clear
          </Button>
        </HStack>
      </Stack>
    </Frame>
  );
}
