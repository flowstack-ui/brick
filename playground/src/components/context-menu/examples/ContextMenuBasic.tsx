import {
  Button,
  ContextMenu,
  DropdownMenu,
  For,
  HStack,
  Surface,
} from "@flowstack-ui/brick";

const commands = [
  { value: "new", label: "New file", tone: "neutral" },
  { value: "open", label: "Open file", tone: "neutral" },
  { value: "delete", label: "Delete file", tone: "danger" },
] as const;

export function ContextMenuBasic() {
  return (
    <HStack gap="4" wrap="wrap">
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Actions: right-click or press Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <For each={commands}>
            {({ value, label, tone }) => (
              <ContextMenu.Item key={value} value={value} tone={tone}>
                {label}
              </ContextMenu.Item>
            )}
          </For>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button tone="neutral" variant="outline">
            Actions
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <For each={commands}>
            {({ value, label, tone }) => (
              <DropdownMenu.Item key={value} value={value} tone={tone}>
                {label}
              </DropdownMenu.Item>
            )}
          </For>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </HStack>
  );
}
