import { Frame, NavigationMenu, VStack } from "@flowstack-ui/brick";

export function NavigationMenuComposition() {
  return (
    <Frame minBlockSize="18rem">
      <VStack gap="4" align="start">
        <NavigationMenu.Root aria-label="Composed navigation">
          <NavigationMenu.List>
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger asChild>
                <button>Learn</button>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link asChild>
                  <a href="#usage">Getting started</a>
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="upcoming">
              <NavigationMenu.Trigger disabled>
                Coming soon
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      </VStack>
    </Frame>
  );
}
