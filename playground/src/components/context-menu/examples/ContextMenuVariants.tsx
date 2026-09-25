import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuVariants() {
  return (
    <ContextMenu.Root variant="plain">
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Plain highlight: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
        <ContextMenu.Item value="duplicate">Duplicate record</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
