import { Select, For, Popover, Button } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function SelectPopover() {
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
          <Select.Root items={items}>
            <Select.Trigger aria-label="Nested framework">
              <Select.Value placeholder="Choose framework" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content disablePortal>
              <For each={items}>
                {(item) => (
                  <Select.Item key={item.value} value={item.value}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                )}
              </For>
            </Select.Content>
          </Select.Root>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  );
}
