import {
  MultiSelect,
  For,
  Frame,
  VStack,
  HStack,
  Button,
} from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectAsync() {
  const [loaded, setLoaded] = useState(false);
  const items = loaded
    ? [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
      ]
    : [];
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Button variant="outline" onClick={() => setLoaded(true)}>
          Load options
        </Button>
        <MultiSelect.Root items={items} disabled={!loaded}>
          <HStack gap="2">
            <MultiSelect.Trigger aria-label="Loaded framework">
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
      </VStack>
    </Frame>
  );
}
