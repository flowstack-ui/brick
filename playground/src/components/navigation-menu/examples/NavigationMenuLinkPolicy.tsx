import { Frame, NavigationMenu } from "@flowstack-ui/brick";
export function NavigationMenuLinkPolicy() {
  return (
    <Frame minBlockSize="18rem">
      <NavigationMenu.Root aria-label="Documentation">
        <NavigationMenu.List surface="raised">
          <NavigationMenu.Item value="learn">
            <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#linkPolicy" closeOnClick={false}>
                Keep this panel open
              </NavigationMenu.Link>
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
