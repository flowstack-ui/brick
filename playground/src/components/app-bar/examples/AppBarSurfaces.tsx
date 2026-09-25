import { AppBar, For, Text, VStack } from "@flowstack-ui/brick";
export function AppBarSurfaces() {
  return (
    <VStack gap={4}>
      <For each={["surface", "solid", "transparent"] as const}>
        {(variant) => (
          <AppBar.Root key={variant} variant={variant}>
            <AppBar.Toolbar>
              <AppBar.Start>
                <Text tone="inherit">{variant}</Text>
              </AppBar.Start>
            </AppBar.Toolbar>
          </AppBar.Root>
        )}
      </For>
      <AppBar.Root variant="solid" tone="accent" bordered={false}>
        <AppBar.Toolbar>
          <AppBar.Start>
            <Text tone="inherit">Accent</Text>
          </AppBar.Start>
        </AppBar.Toolbar>
      </AppBar.Root>
    </VStack>
  );
}
