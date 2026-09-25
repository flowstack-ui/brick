import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuInsets() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Compact panel: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content inset="none">
        <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
        <ContextMenu.Item value="duplicate">Duplicate record</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
