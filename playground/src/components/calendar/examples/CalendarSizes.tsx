import { Calendar, HStack, Stack, Text, parseDate } from "@flowstack-ui/brick";
export function CalendarSizes() {
  return (
    <HStack align="start" gap={6} wrap>
      {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Stack key={size} gap={2}>
          <Text variant="body-sm">{size}</Text>
          <Calendar.Root
            size={size}
            referenceDate={parseDate("2026-09-18")}
            aria-label={size + " calendar"}
          />
        </Stack>
      ))}
    </HStack>
  );
}
