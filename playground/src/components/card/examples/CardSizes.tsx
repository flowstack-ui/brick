import { Card, For, Grid } from "@flowstack-ui/brick";
export function CardSizes() {
  return (
    <Grid.Root columns={{ md: 3 }} gap={6}>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Card.Root key={size} size={size}>
            <Card.Header>
              <Card.Title>{size}</Card.Title>
              <Card.Description>Coordinated text and inset.</Card.Description>
            </Card.Header>
            <Card.Content>One subject, with room to breathe.</Card.Content>
          </Card.Root>
        )}
      </For>
    </Grid.Root>
  );
}
