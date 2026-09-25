import { NavigationMenu, VStack } from "@flowstack-ui/brick";
export function NavigationMenuVertical() {
  return (
    <NavigationMenu.Root
      aria-label="Vertical documentation"
      orientation="vertical"
    >
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
  );
}
