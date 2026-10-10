import { Frame, Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridAlignment() {
  return (
    <Frame blockSize="12rem" asChild>
      <Grid.Root
        templateColumns="repeat(2, minmax(0, 6rem))"
        autoRows="4rem"
        gap={3}
        align="center"
        justify="center"
        alignContent="center"
        justifyContent="space-between"
      >
        <Surface tone="accent" level="subtle" inset="sm">
          <Text>Start</Text>
        </Surface>
        <Surface tone="accent" level="subtle" inset="sm">
          <Text>End</Text>
        </Surface>
      </Grid.Root>
    </Frame>
  );
}
