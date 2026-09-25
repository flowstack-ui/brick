import {
  AppBar,
  Button,
  CloseButton,
  Drawer,
  Hide,
  HStack,
  Link,
  Show,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function AppBarResponsive() {
  return (
    <AppBar.Root aria-label="Responsive workspace">
      <AppBar.Toolbar layout="flex" gap={2}>
        <AppBar.Start>
          <Text truncate weight="semibold">
            Workspace
          </Text>
        </AppBar.Start>
        <AppBar.End>
          <Show from="lg">
            <HStack as="nav" aria-label="Workspace destinations" gap={4}>
              <Link href="#usage" variant="plain">
                Projects
              </Link>
              <Link href="#props" variant="plain">
                Settings
              </Link>
            </HStack>
          </Show>
          <Hide from="lg">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button size="sm" variant="ghost" tone="neutral">
                  Menu
                </Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Workspace navigation</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <VStack gap={4}>
                        <Drawer.Close asChild>
                          <Link href="#usage">Projects</Link>
                        </Drawer.Close>
                        <Drawer.Close asChild>
                          <Link href="#props">Settings</Link>
                        </Drawer.Close>
                      </VStack>
                    </Drawer.Body>
                    <Drawer.Close placement="corner" asChild>
                      <CloseButton aria-label="Close navigation" />
                    </Drawer.Close>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Portal>
            </Drawer.Root>
          </Hide>
        </AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
