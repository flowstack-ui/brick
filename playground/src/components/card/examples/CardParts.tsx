import { Card, Frame, HStack, Text } from "@flowstack-ui/brick";
export function CardParts() {
  return (
    <Frame maxInlineSize={420}>
      <Card.Root>
        <Card.Header>
          <Card.Title asChild>
            <h2>Project summary</h2>
          </Card.Title>
        </Card.Header>
        <Card.Content asChild gap={3}>
          <section aria-label="Activity">
            <Text>Updated today</Text>
            <Text tone="secondary">Ready for the next review.</Text>
          </section>
        </Card.Content>
        <Card.Footer asChild>
          <HStack justify="between" gap={4}>
            <Text>Design team</Text>
            <Text tone="secondary">3 members</Text>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </Frame>
  );
}
