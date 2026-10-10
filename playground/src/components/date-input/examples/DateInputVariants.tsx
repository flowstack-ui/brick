import { DateInput, Frame, Stack, Text, parseDate } from "@flowstack-ui/brick";
export function DateInputVariants() {
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        {(
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        ).map((variant) => (
          <Stack key={variant} gap={2}>
            <Text as="span" variant="body-sm">
              {variant}
            </Text>
            <DateInput.Root
              variant={variant}
              referenceDate={parseDate("2026-09-18")}
              aria-label={variant + " appointment"}
            />
          </Stack>
        ))}
      </Stack>
    </Frame>
  );
}
