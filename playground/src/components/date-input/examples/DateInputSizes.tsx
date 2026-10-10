import { DateInput, Frame, Stack, Text, parseDate } from "@flowstack-ui/brick";
export function DateInputSizes() {
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
          <Stack key={size} gap={2}>
            <Text as="span" variant="body-sm">
              {size}
            </Text>
            <DateInput.Root
              size={size}
              referenceDate={parseDate("2026-09-18")}
              aria-label={size + " appointment"}
            />
          </Stack>
        ))}
      </Stack>
    </Frame>
  );
}
