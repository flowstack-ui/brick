import {
  NavigationMenu,
  For,
  VStack,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";
export function NavigationMenuOverflow() {
  return (
    <NavigationMenu.Root aria-label="Documentation">
      <NavigationMenu.List surface="raised">
        <NavigationMenu.Item value="learn">
          <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Frame blockSize="12rem" inlineSize="16rem" asChild>
              <ScrollArea.Root>
                <ScrollArea.Viewport>
                  <ScrollArea.Content>
                    <VStack gap="2">
                      <For each={Array.from({ length: 20 }, (_, i) => i + 1)}>
                        {(value) => (
                          <NavigationMenu.Link key={value} href="#props">
                            Guide {value}
                          </NavigationMenu.Link>
                        )}
                      </For>
                    </VStack>
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
              </ScrollArea.Root>
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
  );
}
