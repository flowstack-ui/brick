import { Frame, NavigationMenu, VStack } from "@flowstack-ui/brick";

export function NavigationMenuAlignment() {
  return (
    <Frame minBlockSize="12rem">
      <VStack align="end">
        <NavigationMenu.Root aria-label="Resources alignment">
          <NavigationMenu.List surface="raised">
            <NavigationMenu.Item value="alignment">
              <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <Frame inlineSize="14rem">
                  <VStack gap="1">
                    <NavigationMenu.Link href="#usage">
                      Getting started
                    </NavigationMenu.Link>
                    <NavigationMenu.Link href="#props">
                      API reference
                    </NavigationMenu.Link>
                  </VStack>
                </Frame>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport align="end" />
        </NavigationMenu.Root>
      </VStack>
    </Frame>
  );
}
