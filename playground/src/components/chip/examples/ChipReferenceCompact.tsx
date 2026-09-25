import { Chip } from "@flowstack-ui/brick";
export function ChipReferenceCompact() {
  return (
    <Chip.Root density="compact" variant="surface" radius="control">
      <Chip.Label>Design team</Chip.Label>
    </Chip.Root>
  );
}
