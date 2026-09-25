import {
  Frame,
  Button,
  HStack,
  NavigationMenu,
  Text,
  VStack,
  useNavigationMenu,
} from "@flowstack-ui/brick";

export function NavigationMenuController() {
  const menu = useNavigationMenu();
  return (
    <Frame minBlockSize="18rem">
      <VStack gap="4">
        <HStack gap="3">
          <Button onClick={() => menu.setValue("learn")}>Open Learn</Button>
          <Button variant="outline" onClick={() => menu.setValue(null)}>
            Close
          </Button>
        </HStack>
        <NavigationMenu.RootProvider
          value={menu}
          aria-label="Controller navigation"
        >
          <NavigationMenu.List surface="raised">
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="#usage">
                  Getting started
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
          <NavigationMenu.Context>
            {({ value }) => (
              <Text tone="secondary">Open panel: {value ?? "none"}</Text>
            )}
          </NavigationMenu.Context>
        </NavigationMenu.RootProvider>
      </VStack>
    </Frame>
  );
}
