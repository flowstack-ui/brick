import { For, Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridAreas() {
  return (
    <Grid.Root
      templateColumns={{
        initial: "minmax(0, 1fr)",
        md: "minmax(0, 1fr) minmax(0, 2fr)",
      }}
      templateAreas={{
        initial: '"header" "nav" "main"',
        md: '"header header" "nav main"',
      }}
      gap={4}
    >
      <For each={["header", "nav", "main"]}>
        {(area) => (
          <Grid.Item key={area} area={area} asChild>
            <Surface tone="accent" level="subtle" inset="md">
              <Text>{area}</Text>
            </Surface>
          </Grid.Item>
        )}
      </For>
    </Grid.Root>
  );
}
