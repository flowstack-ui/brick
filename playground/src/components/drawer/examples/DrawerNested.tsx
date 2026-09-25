import { Button, Drawer, Paragraph } from "@flowstack-ui/brick";

export function DrawerNested() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Nested drawer</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content size="md">
            <Drawer.Header>
              <Drawer.Title>Project settings</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <Button variant="outline">Edit details</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Positioner>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>Project details</Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Paragraph>
                          Only the top panel receives Escape and keyboard focus.
                        </Paragraph>
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Drawer.Close asChild>
                          <Button>Done</Button>
                        </Drawer.Close>
                      </Drawer.Footer>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Drawer.Portal>
              </Drawer.Root>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="outline">Close settings</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
