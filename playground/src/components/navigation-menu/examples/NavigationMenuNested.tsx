import { Frame, NavigationMenu, VStack } from "@flowstack-ui/brick";

export function NavigationMenuNested() {
  return (
    <Frame minBlockSize="18rem">
      <NavigationMenu.Root aria-label="Nested documentation">
        <NavigationMenu.List surface="raised">
          <NavigationMenu.Item value="learn">
            <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Sub viewport={false} disableHoverTrigger>
                <NavigationMenu.List surface="raised">
                  <NavigationMenu.Item value="layout">
                    <NavigationMenu.Trigger>Layout</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <VStack gap="2">
                        <NavigationMenu.Link href="#usage">
                          Getting started
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#props">
                          API reference
                        </NavigationMenu.Link>
                      </VStack>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Sub>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
    </Frame>
  );
}
