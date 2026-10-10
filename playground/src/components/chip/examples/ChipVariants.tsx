import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipVariants() {
  return (
    <HStack gap={3} wrap="wrap">
      {(["soft", "subtle", "outline", "surface", "solid"] as const).map(
        (variant) => (
          <Chip.Root
            radius="control"
            key={variant}
            variant={variant}
            tone="accent"
          >
            <Chip.Label>{variant}</Chip.Label>
          </Chip.Root>
        ),
      )}
    </HStack>
  );
}
