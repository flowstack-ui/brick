import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuArrow() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions with arrow: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Arrow />
        <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
        <ContextMenu.Item value="duplicate">Duplicate record</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
