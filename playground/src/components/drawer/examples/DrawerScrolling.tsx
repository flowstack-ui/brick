import { Button, Drawer, For, Paragraph, VStack } from "@flowstack-ui/brick";

const sections = Array.from({ length: 24 }, (_, index) => index + 1);

export function DrawerScrolling() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Scrollable drawer</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Project notes</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack gap="4">
                <For each={sections}>
                  {(section) => (
                    <Paragraph key={section}>
                      Section {section}. Long content scrolls inside Body while
                      the actions remain accessible.
                    </Paragraph>
                  )}
                </For>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button>Done reading</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
