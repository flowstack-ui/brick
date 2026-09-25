import { Frame, For, NavigationMenu, VStack } from "@flowstack-ui/brick";

export function NavigationMenuRadius() {
  return (
    <Frame minBlockSize="18rem">
      <VStack gap="6">
        <For each={["none", "sm", "overlay"] as const}>
          {(radius) => (
            <NavigationMenu.Root key={radius} aria-label={`${radius} radius`}>
              <NavigationMenu.List surface="raised">
                <NavigationMenu.Item value="learn">
                  <NavigationMenu.Trigger radius={radius}>
                    {radius}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#radius" radius={radius}>
                      Explore {radius}
                    </NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
              <NavigationMenu.Viewport radius={radius} />
            </NavigationMenu.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
