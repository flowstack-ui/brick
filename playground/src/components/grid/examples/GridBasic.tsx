import { For, Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridBasic() {
  return (
    <Grid.Root columns={3} gap={4}>
      <For each={["One", "Two", "Three"]}>
        {(label) => (
          <Surface key={label} tone="accent" level="subtle" inset="md">
            <Text>{label}</Text>
          </Surface>
        )}
      </For>
    </Grid.Root>
  );
}
