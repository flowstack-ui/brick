import { Card, For, Grid } from "@flowstack-ui/brick";
export function CardRadius() {
  return (
    <Grid.Root columns={{ md: 3 }} gap={4}>
      <For each={["none", "sm", "surface"] as const}>
        {(radius) => (
          <Card.Root key={radius} radius={radius}>
            <Card.Content>{radius}</Card.Content>
          </Card.Root>
        )}
      </For>
    </Grid.Root>
  );
}
