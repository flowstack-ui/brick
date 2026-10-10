import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridSubgrid() {
  return (
    <Grid.Root templateColumns="minmax(0, 1fr) minmax(0, 2fr)" gap={4}>
      <Surface level="subtle" inset="sm">
        <Text>One share</Text>
      </Surface>
      <Surface level="subtle" inset="sm">
        <Text>Two shares</Text>
      </Surface>
      <Grid.Item columnSpan="full" asChild>
        <Grid.Root templateColumns="subgrid" gap={4}>
          <Surface tone="accent" level="subtle" inset="sm">
            <Text>Aligned</Text>
          </Surface>
          <Surface tone="accent" level="subtle" inset="sm">
            <Text>With parent tracks</Text>
          </Surface>
        </Grid.Root>
      </Grid.Item>
    </Grid.Root>
  );
}
