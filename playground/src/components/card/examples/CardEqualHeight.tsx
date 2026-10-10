import { Button, Card, Grid, Paragraph } from "@flowstack-ui/brick";
export function CardEqualHeight() {
  return (
    <Grid.Root columns={{ md: 2 }} gap={4}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Starter</Card.Title>
        </Card.Header>
        <Card.Content>
          <Paragraph>A focused workspace for a small team.</Paragraph>
        </Card.Content>
        <Card.Footer>
          <Button variant="outline">Choose Starter</Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Title>Studio</Card.Title>
        </Card.Header>
        <Card.Content gap={4}>
          <Paragraph>
            Bring your entire team together with shared projects, discussions
            and a searchable knowledge base.
          </Paragraph>
          <Paragraph>
            Includes advanced collaboration tools and priority support as your
            team grows.
          </Paragraph>
        </Card.Content>
        <Card.Footer>
          <Button>Choose Studio</Button>
        </Card.Footer>
      </Card.Root>
    </Grid.Root>
  );
}
