import {
  Appearance,
  For,
  HStack,
  NavigationMenu,
  Surface,
} from "@flowstack-ui/brick";

export function NavigationMenuAppearance() {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["light", "dark"] as const}>
        {(value) => (
          <Appearance key={value} value={value}>
            <Surface level="canvas" inset="md" radius="sm">
              <NavigationMenu.Root
                aria-label={`${value} navigation`}
                tone="accent"
              >
                <NavigationMenu.List surface="raised">
                  <NavigationMenu.Item value="learn">
                    <NavigationMenu.Trigger>{value}</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <NavigationMenu.Link href="#usage">
                        Getting started
                      </NavigationMenu.Link>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
                <NavigationMenu.Viewport />
              </NavigationMenu.Root>
            </Surface>
          </Appearance>
        )}
      </For>
    </HStack>
  );
}
