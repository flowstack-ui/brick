import { Select, For, Dialog, Button, CloseButton } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function SelectDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Choose framework</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Select.Root items={items}>
              <Select.Trigger aria-label="Nested framework">
                <Select.Value placeholder="Choose framework" />
                <Select.Icon />
              </Select.Trigger>
              <Select.Content>
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
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
