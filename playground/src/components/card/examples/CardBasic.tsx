import { Avatar, Button, Card, Frame } from "@flowstack-ui/brick";
export function CardBasic() {
  return (
    <Frame maxInlineSize={320}>
      <Card.Root>
        <Card.Content gap={3}>
          <Avatar
            src="/assets/image/studio.webp"
            fallback="NC"
            alt="Nue Camp studio"
            size="lg"
            radius="sm"
          />
          <Card.Title as="h2">Nue Camp</Card.Title>
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
  );
}
