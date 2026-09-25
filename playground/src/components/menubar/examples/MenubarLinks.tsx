import { Menubar, Link } from "@flowstack-ui/brick";
export function MenubarLinks() {
  return (
    <Menubar.Root aria-label="Actions">
      <Menubar.Menu value="file">
        <Menubar.Trigger>Actions</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item asChild value="guide">
            <Link
              variant="plain"
              tone="inherit"
              href="https://github.com/flowstack-ui/brick"
              target="_blank"
              rel="noreferrer"
            >
              Source repository
            </Link>
          </Menubar.Item>
          <Menubar.Item asChild tone="danger" value="help">
            <Link
              variant="plain"
              tone="inherit"
              href="https://github.com/flowstack-ui/brick/issues"
              target="_blank"
              rel="noreferrer"
            >
              Report a problem
            </Link>
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
