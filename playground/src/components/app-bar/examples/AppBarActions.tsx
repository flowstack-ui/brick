import { AppBar, Button, Popover, Text } from "@flowstack-ui/brick";
export function AppBarActions() {
  return (
    <AppBar.Root variant="solid" tone="accent">
      <AppBar.Toolbar layout="flex">
        <AppBar.Start>
          <Text truncate tone="inherit">
            Workspace
          </Text>
        </AppBar.Start>
        <AppBar.End>
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="ghost" tone="neutral" size="sm">
                Settings
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content>
                <Popover.Header>
                  <Popover.Title>Workspace settings</Popover.Title>
                </Popover.Header>
                <Popover.Body>
                  <Text>Choose your workspace preferences.</Text>
                </Popover.Body>
                <Popover.Footer>
                  <Popover.Close asChild>
                    <Button size="sm">Done</Button>
                  </Popover.Close>
                </Popover.Footer>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
