import { Calendar, HStack, Stack, Text, parseDate } from "@flowstack-ui/brick";
export function CalendarStates() {
  const date = parseDate("2026-09-18");
  return (
    <HStack gap={6} align="start" wrap>
      {(["disabled", "readOnly", "restricted"] as const).map((state) => (
        <Stack key={state} gap={2}>
          <Text variant="body-sm">{state}</Text>
          <Calendar.Root
            referenceDate={date}
            defaultValue={date}
            disabled={state === "disabled"}
            readOnly={state === "readOnly"}
            min={state === "restricted" ? date : undefined}
            max={state === "restricted" ? date.add({ days: 14 }) : undefined}
            isDateUnavailable={
              state === "restricted" ? (value) => value.day === 20 : undefined
            }
            aria-label={state + " calendar"}
          />
        </Stack>
      ))}
    </HStack>
  );
}
