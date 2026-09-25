import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridInline() {
  return (
    <Grid.Root inline templateColumns="auto auto" gap={3} asChild>
      <Surface level="canvas" bordered inset="md">
        <Text>Inline</Text>
        <Text>Grid</Text>
      </Surface>
    </Grid.Root>
  );
}
