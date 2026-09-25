import { ToggleGroup, HStack, For } from "@flowstack-ui/brick";

export function ToggleGroupSizes() {
  return (
    <HStack gap="3" wrap>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <ToggleGroup.Root size={size} aria-label={`size: ${size}`}>
            <ToggleGroup.Item value="bold">{size} 1</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">{size} 2</ToggleGroup.Item>
          </ToggleGroup.Root>
        )}
      </For>
    </HStack>
  );
}
