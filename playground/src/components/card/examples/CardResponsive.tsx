import { Button, Card, Frame } from "@flowstack-ui/brick";
export function CardResponsive() {
  return (
    <Frame maxInlineSize={480}>
      <Card.Root
        size={{ sm: "sm", md: "lg", lg: "md" }}
        variant={{ sm: "subtle", md: "elevated", lg: "outline" }}
        bordered
      >
        <Card.Header gap={{ md: 3 }}>
          <Card.Title>Adaptive workspace</Card.Title>
          <Card.Description>
            Density and prominence respond to the available viewport.
          </Card.Description>
        </Card.Header>
        <Card.Content gap={{ md: 4 }}>
          The explicit border stays visible through every recipe change.
        </Card.Content>
        <Card.Footer justify={{ md: "end" }} gap={{ md: 4 }}>
          <Button variant="outline">Explore</Button>
          <Button>Open</Button>
        </Card.Footer>
      </Card.Root>
    </Frame>
  );
}
