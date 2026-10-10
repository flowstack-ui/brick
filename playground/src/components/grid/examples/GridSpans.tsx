import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridSpans() {
  return (
    <Grid.Root columns={4} templateRows="repeat(2, minmax(5rem, auto))" gap={4}>
      <Grid.Item rowSpan={2} asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Two rows</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item columnSpan={3} asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Three columns</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item columnSpan={3} asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Three columns</Text>
        </Surface>
      </Grid.Item>
    </Grid.Root>
  );
}
