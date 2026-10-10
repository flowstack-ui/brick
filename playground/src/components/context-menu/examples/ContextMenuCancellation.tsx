import { ContextMenu, Surface } from "@flowstack-ui/brick";
export function ContextMenuCancellation() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Cancel selection: right-click or Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          value="keep"
          onSelect={(event) => event.preventDefault()}
        >
          Keep open
        </ContextMenu.Item>
        <ContextMenu.Item value="finish">Finish and close</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
