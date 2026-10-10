import { Card, For, Grid } from "@flowstack-ui/brick";
export function CardBorders() {
  return (
    <Grid.Root columns={{ md: 3 }} gap={4}>
      <For each={["outline", "elevated", "subtle"] as const}>
        {(variant) => (
          <Card.Root key={variant} variant={variant} bordered>
            <Card.Content>{variant} with an explicit border</Card.Content>
          </Card.Root>
        )}
      </For>
    </Grid.Root>
  );
}
