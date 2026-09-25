import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipDensity() {
  return (
    <HStack gap={3} wrap="wrap">
      <Chip.Root radius="control">
        <Chip.Label>Comfortable</Chip.Label>
      </Chip.Root>
      <Chip.Root radius="control" density="compact">
        <Chip.Label>Compact</Chip.Label>
      </Chip.Root>
    </HStack>
  );
}
