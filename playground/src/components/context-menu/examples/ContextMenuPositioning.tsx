import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuPositioning() {
  return (
    <ContextMenu.Root positioning={{ placement: "right-start", gutter: 8 }}>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Side actions: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
        <ContextMenu.Item value="duplicate">Duplicate record</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
