import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipColors() {
  const values = [
    ["neutral", "Planning"],
    ["contrast", "Priority"],
    ["accent", "Design"],
    ["info", "Research"],
    ["success", "Approved"],
    ["warning", "Review"],
    ["danger", "Blocked"],
  ] as const;
  return (
    <HStack gap={3} wrap="wrap">
      {values.map(([tone, label]) => (
        <Chip.Root radius="control" key={tone} tone={tone} variant="surface">
          <Chip.Label>{label}</Chip.Label>
        </Chip.Root>
      ))}
    </HStack>
  );
}
