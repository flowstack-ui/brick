import { Menubar, Icon } from "@flowstack-ui/brick";
import { Plus } from "lucide-react";
export function MenubarAnatomy() {
  return (
    <Menubar.Root aria-label="Actions">
      <Menubar.Menu value="file">
        <Menubar.Trigger>Actions</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Group>
            <Menubar.Label>Workspace</Menubar.Label>
            <Menubar.Item value="new">
              <Menubar.Leading aria-hidden="true">
                <Icon size="inherit" tone="inherit">
                  <Plus />
                </Icon>
              </Menubar.Leading>
              <Menubar.ItemLabel>New workspace</Menubar.ItemLabel>
              <Menubar.Description>
                Create a shared place for your team.
              </Menubar.Description>
              <Menubar.Shortcut>⌘N</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item disabled value="locked">
              Locked workspace
            </Menubar.Item>
          </Menubar.Group>
          <Menubar.Separator />
          <Menubar.Item value="archive" tone="danger">
            Archive workspace
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
          <Menubar.Item disabled value="redo">
            Redo
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
