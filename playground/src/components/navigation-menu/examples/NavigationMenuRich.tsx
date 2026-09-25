import {
  NavigationMenu,
  VStack,
  Text,
  Frame,
  Surface,
} from "@flowstack-ui/brick";
export function NavigationMenuRich() {
  return (
    <Frame minBlockSize="20rem">
      <NavigationMenu.Root aria-label="Documentation">
        <NavigationMenu.List surface="raised">
          <NavigationMenu.Item value="learn">
            <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <Frame maxInlineSize={360}>
                <VStack gap="1">
                  <NavigationMenu.Link variant="panel" href="#usage">
                    <Surface inset="md" level="subtle">
                      <VStack gap="1">
                        <Text weight="semibold">Start building</Text>
                        <Text tone="secondary" variant="body-sm">
                          Learn the core composition model.
                        </Text>
                      </VStack>
                    </Surface>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link variant="panel" href="#props">
                    <Surface inset="md" level="subtle">
                      <VStack gap="1">
                        <Text weight="semibold">Explore the API</Text>
                        <Text tone="secondary" variant="body-sm">
                          Choose supported public options.
                        </Text>
                      </VStack>
                    </Surface>
                  </NavigationMenu.Link>
                </VStack>
              </Frame>
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
    </Frame>
  );
}
