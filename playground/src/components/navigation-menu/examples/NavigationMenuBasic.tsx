import {
  Frame,
  Grid,
  NavigationMenu,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function NavigationMenuBasic() {
  return (
    <Frame minBlockSize="20rem" asChild>
      <VStack align="center">
        <NavigationMenu.Root aria-label="Documentation">
          <NavigationMenu.List surface="raised">
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
              <NavigationMenu.Content inset="md">
                <Frame inlineSize="30rem" maxInlineSize="100%">
                  <Grid.Root columns={2} gap="2">
                    <Grid.Item rowSpan={3} asChild>
                      <NavigationMenu.Link variant="panel" href="#usage">
                        <Surface
                          tone="accent"
                          level="subtle"
                          inset="lg"
                          radius="sm"
                          asChild
                        >
                          <VStack justify="end" gap="2">
                            <Text variant="title-sm">Brick</Text>
                            <Text variant="body-sm" tone="secondary">
                              Composable components for accessible interfaces.
                            </Text>
                          </VStack>
                        </Surface>
                      </NavigationMenu.Link>
                    </Grid.Item>
                    <NavigationMenu.Link href="#usage">
                      <VStack gap="1">
                        <Text weight="semibold">Getting started</Text>
                        <Text variant="body-sm" tone="secondary">
                          Build accessible interfaces with Brick.
                        </Text>
                      </VStack>
                    </NavigationMenu.Link>
                    <NavigationMenu.Link href="#examples">
                      <VStack gap="1">
                        <Text weight="semibold">Examples</Text>
                        <Text variant="body-sm" tone="secondary">
                          Explore layouts and composition patterns.
                        </Text>
                      </VStack>
                    </NavigationMenu.Link>
                    <NavigationMenu.Link href="#props">
                      <VStack gap="1">
                        <Text weight="semibold">API reference</Text>
                        <Text variant="body-sm" tone="secondary">
                          Find the right props for your navigation.
                        </Text>
                      </VStack>
                    </NavigationMenu.Link>
                  </Grid.Root>
                </Frame>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="community">
              <NavigationMenu.Trigger>Community</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <Frame inlineSize="20rem" maxInlineSize="100%">
                  <NavigationMenu.Link
                    href="https://github.com/flowstack-ui/brick"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <VStack gap="1">
                      <Text weight="semibold">GitHub</Text>
                      <Text variant="body-sm" tone="secondary">
                        Read the source and contribute to Brick.
                      </Text>
                    </VStack>
                  </NavigationMenu.Link>
                </Frame>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="home">
              <NavigationMenu.Link href="#usage">Overview</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Indicator />
          </NavigationMenu.List>
          <NavigationMenu.Viewport anchor="navigation" />
        </NavigationMenu.Root>
      </VStack>
    </Frame>
  );
}
