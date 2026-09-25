import { Avatar, Button, Card, For, Frame, Stack } from "@flowstack-ui/brick";
export function CardVariants() {
  return (
    <Stack direction="row" wrap="wrap" gap={4}>
      <For each={["subtle", "outline", "elevated"] as const}>
        {(variant) => (
          <Frame key={variant} inlineSize={320} maxInlineSize="100%">
            <Card.Root variant={variant}>
              <Card.Content gap={3}>
                <Avatar
                  src="/assets/image/studio.webp"
                  alt="Nue Camp studio"
                  fallback="NC"
                  size="lg"
                  radius="sm"
                />
                <Card.Title>{variant}</Card.Title>
                <Card.Description>
                  A welcoming space to create, share ideas and work alongside a
                  community of curious people.
                </Card.Description>
              </Card.Content>
              <Card.Footer justify="end">
                <Button variant="outline">View</Button>
                <Button>Join</Button>
              </Card.Footer>
            </Card.Root>
          </Frame>
        )}
      </For>
    </Stack>
  );
}
