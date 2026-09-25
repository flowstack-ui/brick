import { Select, For, Frame, VStack, HStack, Text } from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectHighlight() {
  const [highlight, setHighlight] = useState<string | null>(null);
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Select.Root
          items={items}
          highlightedValue={highlight}
          onHighlightChange={setHighlight}
          loopFocus={false}
        >
          <HStack gap="2">
            <Select.Trigger aria-label="Highlight framework">
              <Select.Value placeholder="Select framework" />
              <Select.Icon />
            </Select.Trigger>
          </HStack>
          <Select.Content>
            <For each={items}>
              {(item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Root>
        <Text tone="secondary">Highlighted: {highlight || "none"}</Text>
      </VStack>
    </Frame>
  );
}
