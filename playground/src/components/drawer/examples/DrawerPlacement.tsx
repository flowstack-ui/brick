import {
  Drawer,
  Button,
  CloseButton,
  Paragraph,
  For,
  HStack,
  type DrawerPlacement,
} from "@flowstack-ui/brick";
const placements: DrawerPlacement[] = ["start", "end", "top", "bottom"];
export function DrawerPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={placements}>
        {(placement) => (
          <Drawer.Root key={placement}>
            <Drawer.Trigger asChild>
              <Button variant="outline" tone="neutral">
                {placement}
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Positioner>
                <Drawer.Content placement={placement}>
                  <Drawer.Header>
                    <Drawer.Title>{placement}</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Paragraph>
                      Use this panel for a focused task without leaving the
                      current page.
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
        )}
      </For>
    </HStack>
  );
}
