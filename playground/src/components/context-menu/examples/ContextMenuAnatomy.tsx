import { ContextMenu, Surface, Icon } from "@flowstack-ui/brick";
import { Plus } from "lucide-react";
export function ContextMenuAnatomy() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions: right-click or press Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Group>
          <ContextMenu.Label>Workspace</ContextMenu.Label>
          <ContextMenu.Item value="new">
            <ContextMenu.Leading aria-hidden="true">
              <Icon size="inherit" tone="inherit">
                <Plus />
              </Icon>
            </ContextMenu.Leading>
            <ContextMenu.ItemLabel>New workspace</ContextMenu.ItemLabel>
            <ContextMenu.Description>
              Create a shared place for your team.
            </ContextMenu.Description>
            <ContextMenu.Shortcut>⌘N</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item disabled value="locked">
            Locked workspace
          </ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item value="archive" tone="danger">
          Archive workspace
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
