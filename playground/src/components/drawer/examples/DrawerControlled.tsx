import { Drawer, Button, CloseButton, Paragraph } from "@flowstack-ui/brick";
import { useState } from "react";
export function DrawerControlled() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Controlled drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Controlled drawer</Drawer.Title>
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
