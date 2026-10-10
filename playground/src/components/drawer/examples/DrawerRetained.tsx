import { Drawer, Button, CloseButton, Input } from "@flowstack-ui/brick";
export function DrawerRetained() {
  return (
    <Drawer.Root keepMounted>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Retained drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Retained draft</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Input
                aria-label="Draft"
                placeholder="Type, close, then reopen"
              />
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
