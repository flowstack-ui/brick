import { Menubar } from "@flowstack-ui/brick";
export function MenubarArrow() {
  return (
    <Menubar.Root aria-label="Commands with arrow">
      <Menubar.Menu value="file">
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Arrow />
          <Menubar.Item value="new">New file</Menubar.Item>
          <Menubar.Item value="open">Open file</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
          <Menubar.Item value="redo" disabled>
            Redo
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
