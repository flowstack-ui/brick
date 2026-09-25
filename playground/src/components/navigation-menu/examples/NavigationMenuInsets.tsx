import { Frame, NavigationMenu, For, VStack, Text } from "@flowstack-ui/brick";
export function NavigationMenuInsets() {
  return (
    <Frame minBlockSize="24rem">
      <VStack gap="6">
        <For each={["none", "sm", "md", "lg"] as const}>
          {(inset) => (
            <VStack key={inset} gap="2">
              <Text tone="secondary">{inset}</Text>
              <NavigationMenu.Root aria-label="Documentation">
                <NavigationMenu.List surface="raised">
                  <NavigationMenu.Item value="learn">
                    <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
                    <NavigationMenu.Content inset={inset}>
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
            </VStack>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
