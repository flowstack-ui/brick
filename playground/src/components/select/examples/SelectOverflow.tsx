import { Select, Frame, For } from "@flowstack-ui/brick";
const items = Array.from({ length: 40 }, (_, i) => ({
  value: String(i + 1),
  label: `Option ${i + 1}`,
}));
export function SelectOverflow() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root items={items}>
        <Select.Trigger aria-label="Long list">
          <Select.Value placeholder="Choose option" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <For each={items}>
              {(item) => (
                <Select.Item key={item.value} value={item.value}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Root>
    </Frame>
  );
}
