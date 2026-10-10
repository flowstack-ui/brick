import { For, Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridImplicit() {
  return (
    <Grid.Root
      templateRows="repeat(2, minmax(4rem, auto))"
      autoColumns="minmax(0, 1fr)"
      autoFlow="column"
      gap={3}
    >
      <For each={["One", "Two", "Three", "Four", "Five", "Six"]}>
        {(label) => (
          <Surface key={label} tone="accent" level="subtle" inset="sm">
            <Text>{label}</Text>
          </Surface>
        )}
      </For>
    </Grid.Root>
  );
}
