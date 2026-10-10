import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuTones() {
  return (
    <ContextMenu.Root tone="accent">
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Accent actions: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
        <ContextMenu.Item value="duplicate">Duplicate record</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item value="delete" tone="danger">
          Delete record
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
