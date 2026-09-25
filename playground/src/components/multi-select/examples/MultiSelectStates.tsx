import { MultiSelect, For, Frame, VStack, HStack } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectStates() {
  return (
    <VStack gap="4">
      <Frame maxInlineSize="20rem">
        <MultiSelect.Root items={items} disabled>
          <HStack gap="2">
            <MultiSelect.Trigger aria-label="Disabled framework">
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
      </Frame>
      <Frame maxInlineSize="20rem">
        <MultiSelect.Root items={items} invalid>
          <HStack gap="2">
            <MultiSelect.Trigger aria-label="Invalid framework">
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
      </Frame>
      <Frame maxInlineSize="20rem">
        <MultiSelect.Root items={items} readOnly defaultValue={["react"]}>
          <HStack gap="2">
            <MultiSelect.Trigger aria-label="Read only framework">
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
      </Frame>
    </VStack>
  );
}
