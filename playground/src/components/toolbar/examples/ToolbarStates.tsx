import { Toolbar, VStack } from "@flowstack-ui/brick";
export function ToolbarStates() {
  return (
    <VStack gap="4" align="start">
      <Toolbar.Root aria-label="Available actions">
        <Toolbar.Button>Undo</Toolbar.Button>
        <Toolbar.Button disabled>Redo</Toolbar.Button>
        <Toolbar.Button disabled focusableWhenDisabled>
          Publish
        </Toolbar.Button>
      </Toolbar.Root>
      <Toolbar.Root disabled aria-label="Locked document">
        <Toolbar.Button>Save</Toolbar.Button>
        <Toolbar.Link href="#usage">Help</Toolbar.Link>
        <Toolbar.ToggleGroup aria-label="Locked format" defaultValue="bold">
          <Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </VStack>
  );
}
