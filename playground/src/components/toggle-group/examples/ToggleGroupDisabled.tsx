import { ToggleGroup, HStack } from "@flowstack-ui/brick";

export function ToggleGroupDisabled() {
  return (
    <HStack gap="3">
      <ToggleGroup.Root disabled aria-label="Formatting">
        <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
        <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root disabled defaultValue="bold" aria-label="Formatting">
        <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
        <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      </ToggleGroup.Root>
    </HStack>
  );
}
