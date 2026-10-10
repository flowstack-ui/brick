import { Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridResponsive() {
  return (
    <Grid.Root
      columns={{ initial: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      gap={{ initial: 2, md: 4 }}
    >
      <Grid.Item
        columnStart={{ initial: 1, sm: 2, lg: 3, xl: 4 }}
        columnSpan={{ initial: 2, md: 3 }}
        asChild
      >
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Featured</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item columnSpan="full" asChild>
        <Surface tone="accent" level="subtle" inset="md">
          <Text>Full width</Text>
        </Surface>
      </Grid.Item>
    </Grid.Root>
  );
}
