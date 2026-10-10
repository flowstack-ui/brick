import { Drawer, Button, CloseButton, Paragraph } from "@flowstack-ui/brick";
export function DrawerOffset() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Inset drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner inset="md">
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Inset drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Paragraph>
                Use this panel for a focused task without leaving the current
                page.
              </Paragraph>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="outline" tone="neutral">
                  Cancel
                </Button>
              </Drawer.Close>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.Close asChild placement="corner">
              <CloseButton aria-label="Close drawer" />
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
