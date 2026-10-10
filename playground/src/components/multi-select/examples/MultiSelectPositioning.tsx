import { MultiSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectPositioning() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root
        items={items}
        positioning={{ placement: "top-start", gutter: 8 }}
      >
        <MultiSelect.Trigger aria-label="Positioned framework">
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
