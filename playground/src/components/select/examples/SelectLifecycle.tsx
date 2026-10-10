import { Select, For, Frame, VStack, HStack, Text } from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectLifecycle() {
  const [exits, setExits] = useState(0);
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Select.Root
          items={items}
          unmountOnExit={false}
          onExitComplete={() => setExits((count) => count + 1)}
        >
          <HStack gap="2">
            <Select.Trigger aria-label="Retained framework">
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
        <Text tone="secondary">Completed exits: {exits}</Text>
      </VStack>
    </Frame>
  );
}
