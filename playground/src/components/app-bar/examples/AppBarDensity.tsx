import { AppBar, For, Text, VStack } from "@flowstack-ui/brick";
export function AppBarDensity() {
  return (
    <VStack gap={4}>
      <For each={["compact", "comfortable"] as const}>
        {(density) => (
          <AppBar.Root key={density}>
            <AppBar.Toolbar density={density} layout="flex">
              <AppBar.Start>
                <Text>{density}</Text>
              </AppBar.Start>
            </AppBar.Toolbar>
          </AppBar.Root>
        )}
      </For>
      <AppBar.Root>
        <AppBar.Toolbar
          density={{ md: "compact" }}
          inset={{ md: "none", lg: "default" }}
          gap={{ initial: 2, md: 4 }}
          layout={{ md: "flex" }}
        >
          <AppBar.Start gap={{ md: 3 }}>
            <Text>Responsive</Text>
          </AppBar.Start>
        </AppBar.Toolbar>
      </AppBar.Root>
    </VStack>
  );
}
