import { Select, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectBasic() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root items={items}>
        <Select.Trigger aria-label="Framework">
          <Select.Value placeholder="Select framework" />
          <Select.Icon />
        </Select.Trigger>
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
  );
}
