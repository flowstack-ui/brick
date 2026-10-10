import { Frame, Toolbar } from "@flowstack-ui/brick";
export function ToolbarResponsive() {
  return (
    <Frame maxInlineSize="20rem">
      <Toolbar.Root
        aria-label="Responsive document tools"
        size={{ initial: "sm", md: "md" }}
      >
        <Toolbar.Button>Undo</Toolbar.Button>
        <Toolbar.Button>Redo</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Find and replace</Toolbar.Button>
        <Toolbar.Button>Export document</Toolbar.Button>
      </Toolbar.Root>
    </Frame>
  );
}
