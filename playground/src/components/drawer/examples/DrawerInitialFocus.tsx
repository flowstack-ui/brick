import { Drawer, Button, CloseButton, Input } from "@flowstack-ui/brick";
import { useRef } from "react";
export function DrawerInitialFocus() {
  const input = useRef<HTMLInputElement>(null);
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Initial focus
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content initialFocus={input}>
            <Drawer.Header>
              <Drawer.Title>Update name</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Input
                ref={input}
                aria-label="Project name"
                placeholder="Project name"
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
