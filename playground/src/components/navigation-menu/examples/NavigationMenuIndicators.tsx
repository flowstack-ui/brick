import { Frame, NavigationMenu, VStack, Icon } from "@flowstack-ui/brick";
import { Plus } from "lucide-react";
export function NavigationMenuIndicators() {
  return (
    <Frame minBlockSize="18rem">
      <VStack gap="6">
        <NavigationMenu.Root aria-label="Documentation">
          <NavigationMenu.List surface="raised">
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger
                indicator={
                  <NavigationMenu.ItemIndicator>
                    <Icon size="inherit">
                      <Plus />
                    </Icon>
                  </NavigationMenu.ItemIndicator>
                }
              >
                Custom indicator
              </NavigationMenu.Trigger>
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
        <NavigationMenu.Root aria-label="Documentation">
          <NavigationMenu.List surface="raised">
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger indicator={null}>
                No indicator
              </NavigationMenu.Trigger>
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
      </VStack>
    </Frame>
  );
}
