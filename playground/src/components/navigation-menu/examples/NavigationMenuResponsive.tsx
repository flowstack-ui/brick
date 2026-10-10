import { useRef } from "react";
import {
  Button,
  Drawer,
  Hide,
  NavList,
  NavigationMenu,
  Show,
  VStack,
} from "@flowstack-ui/brick";

export function NavigationMenuResponsive() {
  const desktopTrigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap="4" align="start">
      <Show from="md">
        <NavigationMenu.Root aria-label="Desktop destinations">
          <NavigationMenu.List>
            <NavigationMenu.Item value="learn">
              <NavigationMenu.Trigger ref={desktopTrigger}>
                Learn
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="#usage">
                  Getting started
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="examples">
              <NavigationMenu.Link href="#examples">
                Examples
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      </Show>
      <Drawer.Root>
        <Hide from="md">
          <Drawer.Trigger asChild>
            <Button ref={mobileTrigger} variant="outline">
              Open navigation
            </Button>
          </Drawer.Trigger>
        </Hide>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Positioner>
            <Drawer.Content
              finalFocus={() =>
                desktopTrigger.current?.getClientRects().length
                  ? desktopTrigger.current
                  : mobileTrigger.current
              }
            >
              <Drawer.Header>
                <Drawer.Title>Navigation</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <NavList.Root aria-label="Mobile destinations">
                  <NavList.List>
                    <NavList.Item>
                      <NavList.Link href="#usage">Getting started</NavList.Link>
                    </NavList.Item>
                    <NavList.Item>
                      <NavList.Link href="#examples">Examples</NavList.Link>
                    </NavList.Item>
                  </NavList.List>
                </NavList.Root>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button variant="outline">Close navigation</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Portal>
      </Drawer.Root>
    </VStack>
  );
}
