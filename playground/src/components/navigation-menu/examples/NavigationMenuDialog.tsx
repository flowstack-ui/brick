import { NavigationMenu, Button, VStack, Dialog } from "@flowstack-ui/brick";
export function NavigationMenuDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Documentation navigation</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <NavigationMenu.Root aria-label="Documentation">
                <NavigationMenu.List surface="raised">
                  <NavigationMenu.Item value="learn">
                    <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <VStack gap="1">
                        <NavigationMenu.Link href="#usage">
                          Getting started
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#examples">
                          Examples
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#props">
                          API reference
                        </NavigationMenu.Link>
                      </VStack>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="community">
                    <NavigationMenu.Trigger>Community</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <NavigationMenu.Link
                        href="https://github.com/flowstack-ui/brick"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </NavigationMenu.Link>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="home">
                    <NavigationMenu.Link active href="#usage">
                      Overview
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Indicator />
                </NavigationMenu.List>
                <NavigationMenu.Viewport />
              </NavigationMenu.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Close</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
