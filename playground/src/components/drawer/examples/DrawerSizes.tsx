import {
  Drawer,
  Button,
  CloseButton,
  Paragraph,
  For,
  HStack,
  type DrawerSize,
} from "@flowstack-ui/brick";
const sizes: DrawerSize[] = ["xs", "sm", "md", "lg", "xl", "full"];
export function DrawerSizes() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={sizes}>
        {(size) => (
          <Drawer.Root key={size}>
            <Drawer.Trigger asChild>
              <Button variant="outline" tone="neutral">
                {size}
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Positioner>
                <Drawer.Content size={size}>
                  <Drawer.Header>
                    <Drawer.Title>{size}</Drawer.Title>
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
