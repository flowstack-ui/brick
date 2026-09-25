import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipRadius() {
  return (
    <HStack gap={3}>
      <Chip.Root radius="control">
        <Chip.Label>Theme rounded</Chip.Label>
      </Chip.Root>
      <Chip.Root shape="pill">
        <Chip.Label>Pill</Chip.Label>
      </Chip.Root>
    </HStack>
  );
}
