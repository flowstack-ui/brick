import { Select, For, Frame, HStack } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectClear() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root items={items} defaultValue="react">
        <HStack gap="2">
          <Select.Trigger aria-label="Clearable framework">
            <Select.Value placeholder="Select framework" />
            <Select.Icon />
          </Select.Trigger>
          <Select.ClearTrigger aria-label="Clear framework" />
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
  );
}
