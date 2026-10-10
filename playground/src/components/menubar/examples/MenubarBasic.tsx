import { Menubar } from "@flowstack-ui/brick";
export function MenubarBasic() {
  return (
    <Menubar.Root aria-label="Document commands">
      <Menubar.Menu value="file">
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="new">New file</Menubar.Item>
          <Menubar.Item value="open">Open file</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item value="delete" tone="danger">
            Delete file
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
      <Menubar.Menu value="view">
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="zoom-in">Zoom in</Menubar.Item>
          <Menubar.Item value="zoom-out">Zoom out</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
