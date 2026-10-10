import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridFlow() {
  return (
    <Grid.Root
      columns={3}
      autoRows="minmax(4rem, auto)"
      autoFlow="row dense"
      gap={3}
    >
      <Grid.Item columnSpan={2} asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>First</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item columnSpan={2} asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Second</Text>
        </Surface>
      </Grid.Item>
      <Surface tone="accent" level="subtle" inset="md">
        <Text>Third</Text>
      </Surface>
    </Grid.Root>
  );
}
