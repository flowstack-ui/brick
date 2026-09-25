import { MultiSelect, For, Popover, Button } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function MultiSelectPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open settings</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Framework settings</Popover.Title>
        </Popover.Header>
        <Popover.Body>
          <MultiSelect.Root items={items}>
            <MultiSelect.Trigger aria-label="Nested framework">
              <MultiSelect.Value placeholder="Choose framework" />
              <MultiSelect.Icon />
            </MultiSelect.Trigger>
            <MultiSelect.Content disablePortal>
              <For each={items}>
                {(item) => (
                  <MultiSelect.Item key={item.value} value={item.value}>
                    <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                    <MultiSelect.ItemIndicator />
                  </MultiSelect.Item>
                )}
              </For>
            </MultiSelect.Content>
          </MultiSelect.Root>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  );
}
