import {
  MultiSelect,
  For,
  Dialog,
  Button,
  CloseButton,
} from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function MultiSelectDialog() {
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
            <MultiSelect.Root items={items}>
              <MultiSelect.Trigger aria-label="Nested framework">
                <MultiSelect.Value placeholder="Choose framework" />
                <MultiSelect.Icon />
              </MultiSelect.Trigger>
              <MultiSelect.Content>
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
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
