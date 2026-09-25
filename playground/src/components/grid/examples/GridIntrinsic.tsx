import { For, Grid, Surface, Text } from "@flowstack-ui/brick";
export function GridIntrinsic() {
  return (
    <Grid.Root minItemSize="xs" gap={4}>
      <For each={["Design", "Build", "Review", "Ship"]}>
        {(label) => (
          <Surface key={label} tone="accent" level="subtle" inset="md">
            <Text>{label}</Text>
          </Surface>
        )}
      </For>
    </Grid.Root>
  );
}
