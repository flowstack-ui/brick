import { MultiSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectPolicy() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root items={items} closeOnSelect>
        <MultiSelect.Trigger aria-label="Selection policy">
          <MultiSelect.Value placeholder="Select framework" />
          <MultiSelect.Icon />
        </MultiSelect.Trigger>
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
