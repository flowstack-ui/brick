import { MultiSelect, Frame, For } from "@flowstack-ui/brick";
const items = Array.from({ length: 40 }, (_, i) => ({
  value: String(i + 1),
  label: `Option ${i + 1}`,
}));
export function MultiSelectOverflow() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root items={items}>
        <MultiSelect.Trigger aria-label="Long list">
          <MultiSelect.Value placeholder="Choose option" />
          <MultiSelect.Icon />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.ScrollUpButton />
          <MultiSelect.Viewport>
            <For each={items}>
              {(item) => (
                <MultiSelect.Item key={item.value} value={item.value}>
                  <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                  <MultiSelect.ItemIndicator />
                </MultiSelect.Item>
              )}
            </For>
          </MultiSelect.Viewport>
          <MultiSelect.ScrollDownButton />
        </MultiSelect.Content>
      </MultiSelect.Root>
    </Frame>
  );
}
