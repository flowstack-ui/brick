import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridTemplates() {
  return (
    <Grid.Root
      templateColumns={{
        initial: "minmax(0, 1fr)",
        md: "[sidebar] minmax(0, 1fr) [content] minmax(0, 2fr) [end]",
      }}
      gap={4}
    >
      <Surface tone="accent" level="subtle" inset="md">
        <Text>Navigation</Text>
      </Surface>
      <Surface tone="accent" level="subtle" inset="md">
        <Text>Main content</Text>
      </Surface>
    </Grid.Root>
  );
}
