import { ToggleGroup, HStack, For } from "@flowstack-ui/brick";

export function ToggleGroupRadius() {
  return (
    <HStack gap="3">
      <For each={["none", "control", "full"] as const}>
        {(radius) => (
          <ToggleGroup.Root
            radius={radius}
            variant="outline"
            aria-label={`radius: ${radius}`}
          >
            <ToggleGroup.Item value="bold">{radius} 1</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">{radius} 2</ToggleGroup.Item>
          </ToggleGroup.Root>
        )}
      </For>
    </HStack>
  );
}
