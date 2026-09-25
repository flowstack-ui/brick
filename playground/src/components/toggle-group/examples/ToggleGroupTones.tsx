import { ToggleGroup, HStack, For } from "@flowstack-ui/brick";

export function ToggleGroupTones() {
  return (
    <HStack gap="3" wrap>
      <For each={["neutral", "accent", "contrast"] as const}>
        {(tone) => (
          <ToggleGroup.Root
            tone={tone}
            variant="solid"
            defaultValue="bold"
            aria-label={`tone: ${tone}`}
          >
            <ToggleGroup.Item value="bold">{tone} 1</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">{tone} 2</ToggleGroup.Item>
          </ToggleGroup.Root>
        )}
      </For>
    </HStack>
  );
}
