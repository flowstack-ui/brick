import {
  Frame,
  HStack,
  NavigationMenu,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function NavigationMenuHeader() {
  return (
    <Frame minBlockSize="14rem">
      <Surface as="header" level="canvas" bordered inset="sm" radius="sm">
        <HStack justify="between" wrap="wrap" gap="2">
          <Text weight="semibold">Acme</Text>
          <NavigationMenu.Root aria-label="Header destinations">
            <NavigationMenu.List>
              <NavigationMenu.Item value="resources">
                <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
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
                <NavigationMenu.Link href="https://github.com/flowstack-ui/brick">
                  GitHub
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Indicator />
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
          </NavigationMenu.Root>
        </HStack>
      </Surface>
    </Frame>
  );
}
