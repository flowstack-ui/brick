import { AppBar, For, Text, VStack } from "@flowstack-ui/brick";
export function AppBarLayout() {
  return (
    <VStack gap={4}>
      <For each={["balanced", "flex"] as const}>
        {(layout) => (
          <AppBar.Root key={layout}>
            <AppBar.Toolbar layout={layout}>
              <AppBar.Start>
                <Text variant="body-sm">Back</Text>
              </AppBar.Start>
              <AppBar.Center>
                <Text truncate weight="semibold">
                  {layout}
                </Text>
              </AppBar.Center>
              <AppBar.End>
                <Text variant="body-sm">Edit</Text>
              </AppBar.End>
            </AppBar.Toolbar>
          </AppBar.Root>
        )}
      </For>
    </VStack>
  );
}
