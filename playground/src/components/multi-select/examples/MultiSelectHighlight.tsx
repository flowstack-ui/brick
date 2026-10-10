import {
  MultiSelect,
  For,
  Frame,
  VStack,
  HStack,
  Text,
} from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectHighlight() {
  const [highlight, setHighlight] = useState<string | null>(null);
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <MultiSelect.Root
          items={items}
          highlightedValue={highlight}
          onHighlightChange={setHighlight}
          loopFocus={false}
        >
          <HStack gap="2">
            <MultiSelect.Trigger aria-label="Highlight framework">
              <MultiSelect.Value placeholder="Select framework" />
              <MultiSelect.Icon />
            </MultiSelect.Trigger>
          </HStack>
          <MultiSelect.Content>
            <For each={items}>
              {(item) => (
                <MultiSelect.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                >
                  <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                  <MultiSelect.ItemIndicator />
                </MultiSelect.Item>
              )}
            </For>
          </MultiSelect.Content>
        </MultiSelect.Root>
        <Text tone="secondary">Highlighted: {highlight || "none"}</Text>
      </VStack>
    </Frame>
  );
}
