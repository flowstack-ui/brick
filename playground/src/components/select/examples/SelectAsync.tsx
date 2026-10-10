import {
  Select,
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
export function SelectAsync() {
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
        <Select.Root items={items} disabled={!loaded}>
          <HStack gap="2">
            <Select.Trigger aria-label="Loaded framework">
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
      </VStack>
    </Frame>
  );
}
