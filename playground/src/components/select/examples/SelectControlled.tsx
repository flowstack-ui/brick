import { Select, For, Frame, VStack, HStack, Text } from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectControlled() {
  const [value, setValue] = useState("react");
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Select.Root items={items} value={value} onValueChange={setValue}>
          <HStack gap="2">
            <Select.Trigger aria-label="Controlled framework">
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
        <Text tone="secondary">Selected: {value}</Text>
      </VStack>
    </Frame>
  );
}
