import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipDisabled() {
  return (
    <HStack gap={3} wrap="wrap">
      <Chip.Root radius="control">
        <Chip.Label>Required category</Chip.Label>
        <Chip.RemoveTrigger disabled ariaLabel="Remove required category" />
      </Chip.Root>
      <Chip.Root radius="control">
        <Chip.ActionTrigger disabled>
          <Chip.Label>Unavailable project</Chip.Label>
        </Chip.ActionTrigger>
      </Chip.Root>
      <Chip.Root radius="control">
        <Chip.ActionTrigger disabled>
          <Chip.Label>Locked assignment</Chip.Label>
        </Chip.ActionTrigger>
        <Chip.RemoveTrigger disabled ariaLabel="Remove locked assignment" />
      </Chip.Root>
    </HStack>
  );
}
