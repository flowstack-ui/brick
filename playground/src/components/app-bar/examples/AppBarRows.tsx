import { AppBar, HStack, Link, Text } from "@flowstack-ui/brick";
export function AppBarRows() {
  return (
    <AppBar.Root>
      <AppBar.Toolbar layout="flex">
        <AppBar.Start>
          <Text weight="semibold">Workspace</Text>
        </AppBar.Start>
      </AppBar.Toolbar>
      <AppBar.Toolbar density="compact" layout="flex">
        <AppBar.Start asChild>
          <HStack as="nav" aria-label="Project sections" gap={4}>
            <Link variant="plain" href="#usage">
              Overview
            </Link>
            <Link variant="plain" href="#props">
              Activity
            </Link>
          </HStack>
        </AppBar.Start>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
