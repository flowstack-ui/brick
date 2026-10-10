import { Calendar, HStack, Stack, Text, parseDate } from "@flowstack-ui/brick";
export function CalendarTones() {
  return (
    <HStack align="start" gap={6} wrap>
      {(["neutral", "accent", "contrast"] as const).map((tone) => (
        <Stack key={tone} gap={2}>
          <Text variant="body-sm">{tone}</Text>
          <Calendar.Root
            tone={tone}
            referenceDate={parseDate("2026-09-18")}
            defaultValue={parseDate("2026-09-21")}
            aria-label={tone + " calendar"}
          />
        </Stack>
      ))}
    </HStack>
  );
}
