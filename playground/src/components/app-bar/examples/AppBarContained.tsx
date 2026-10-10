import { AppBar, Container, Text } from "@flowstack-ui/brick";
export function AppBarContained() {
  return (
    <AppBar.Root>
      <Container>
        <AppBar.Toolbar inset="none" layout="flex">
          <AppBar.Start>
            <Text truncate>Workspace</Text>
          </AppBar.Start>
          <AppBar.End>
            <Text variant="body-sm">Account</Text>
          </AppBar.End>
        </AppBar.Toolbar>
      </Container>
    </AppBar.Root>
  );
}
