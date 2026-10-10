import { Toolbar } from "@flowstack-ui/brick";
export function ToolbarInput() {
  return (
    <Toolbar.Root aria-label="Document search">
      <Toolbar.Group aria-label="History">
        <Toolbar.Button>Undo</Toolbar.Button>
        <Toolbar.Button>Redo</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Input
        aria-label="Find in document"
        placeholder="Find in document"
        fullWidth={false}
      />
    </Toolbar.Root>
  );
}
