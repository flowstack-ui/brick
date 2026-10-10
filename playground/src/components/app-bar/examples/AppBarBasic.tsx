import { AppBar, Button, Text } from "@flowstack-ui/brick";
export function AppBarBasic() {
  return (
    <AppBar.Root aria-label="Workspace header">
      <AppBar.Toolbar layout="flex">
        <AppBar.Start>
          <Text truncate weight="semibold">
            Workspace
          </Text>
        </AppBar.Start>
        <AppBar.End>
          <Button variant="ghost" tone="neutral" size="sm">
            Sign in
          </Button>
        </AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
