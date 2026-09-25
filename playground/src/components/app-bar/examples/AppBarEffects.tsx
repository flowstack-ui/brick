import { AppBar, For, Text, VStack } from "@flowstack-ui/brick";
export function AppBarEffects() {
  return (
    <VStack gap={8}>
      <For each={["none", "low", "medium", "high"] as const}>
        {(elevation) => (
          <AppBar.Root key={elevation} elevation={elevation}>
            <AppBar.Toolbar>
              <AppBar.Start>
                <Text>{elevation}</Text>
              </AppBar.Start>
            </AppBar.Toolbar>
          </AppBar.Root>
        )}
      </For>
      <AppBar.Root variant="solid" blurred>
        <AppBar.Toolbar>
          <AppBar.Start>
            <Text>Blurred</Text>
          </AppBar.Start>
        </AppBar.Toolbar>
      </AppBar.Root>
    </VStack>
  );
}
