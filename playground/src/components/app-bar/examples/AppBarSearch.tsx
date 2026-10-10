import { AppBar, Button, Input, Text } from "@flowstack-ui/brick";
export function AppBarSearch() {
  return (
    <AppBar.Root>
      <AppBar.Toolbar layout="flex" gap={2}>
        <AppBar.Center>
          <Input
            size="sm"
            aria-label="Search workspace"
            placeholder="Search…"
          />
        </AppBar.Center>
        <AppBar.End>
          <Button size="sm" variant="outline" tone="neutral">
            Find
          </Button>
        </AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
