import { Drawer, Button, CloseButton, Paragraph } from "@flowstack-ui/brick";
export function DrawerResponsive() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Responsive drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content
            size={{ initial: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
            placement={{ initial: "bottom", sm: "end" }}
          >
            <Drawer.Header>
              <Drawer.Title>Responsive drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Paragraph>
                Resize the viewport: bottom on mobile, end from sm. The same
                content stays mounted.
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
