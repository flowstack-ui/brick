import { Select, For, Frame, VStack, HStack } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectStates() {
  return (
    <VStack gap="4">
      <Frame maxInlineSize="20rem">
        <Select.Root items={items} disabled>
          <HStack gap="2">
            <Select.Trigger aria-label="Disabled framework">
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
      </Frame>
      <Frame maxInlineSize="20rem">
        <Select.Root items={items} invalid>
          <HStack gap="2">
            <Select.Trigger aria-label="Invalid framework">
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
      </Frame>
      <Frame maxInlineSize="20rem">
        <Select.Root items={items} readOnly defaultValue="react">
          <HStack gap="2">
            <Select.Trigger aria-label="Read only framework">
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
      </Frame>
    </VStack>
  );
}
