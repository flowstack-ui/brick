import { MultiSelect, For, Frame, HStack } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectClear() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root items={items} defaultValue={["react"]}>
        <HStack gap="2">
          <MultiSelect.Trigger aria-label="Clearable framework">
            <MultiSelect.Value placeholder="Select framework" />
            <MultiSelect.Icon />
          </MultiSelect.Trigger>
          <MultiSelect.ClearTrigger aria-label="Clear framework" />
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
  );
}
