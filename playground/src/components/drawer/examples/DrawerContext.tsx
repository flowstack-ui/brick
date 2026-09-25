import { Drawer, Button, CloseButton, Paragraph } from "@flowstack-ui/brick";
export function DrawerContext() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Context drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Context drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.Context>
                {({ open, setOpen }) => (
                  <Button onClick={() => setOpen(false)}>
                    Close from context: {String(open)}
                  </Button>
                )}
              </Drawer.Context>
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
