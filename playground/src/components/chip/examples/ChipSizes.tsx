import { Chip, HStack } from "@flowstack-ui/brick";
export function ChipSizes() {
  return (
    <HStack gap={3} wrap="wrap">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Chip.Root radius="control" key={size} size={size}>
          <Chip.Label>{size} design team</Chip.Label>
        </Chip.Root>
      ))}
    </HStack>
  );
}
