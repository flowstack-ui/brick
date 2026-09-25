import {
  Button,
  Calendar,
  HStack,
  Stack,
  Text,
  parseDate,
  useCalendar,
} from "@flowstack-ui/brick";
export function CalendarController() {
  const calendar = useCalendar({
    referenceDate: parseDate("2026-09-18"),
    selectionMode: "multiple",
    maxSelectedDates: 3,
  });
  return (
    <Stack gap={4} align="start">
      <Calendar.RootProvider value={calendar} aria-label="Meeting dates" />
      <Text role="status" variant="body-sm">
        {calendar.value.map((date) => date.toString()).join(", ") ||
          "Choose up to three dates"}
      </Text>
      <HStack gap={2}>
        <Button variant="outline" onClick={() => calendar.clearValue()}>
          Clear dates
        </Button>
        <Button
          variant="outline"
          onClick={() => calendar.setFocusedValue(parseDate("2026-09-18"))}
        >
          September
        </Button>
      </HStack>
    </Stack>
  );
}
