import { Container, Paragraph, Surface } from "@flowstack-ui/brick";

export function ContainerAsChild() {
  return (
    <Container asChild>
      <Surface as="article" level="subtle">
        <Paragraph>
          One article owns Container’s measure and gutters, with Surface’s
          background.
        </Paragraph>
      </Surface>
    </Container>
  );
}
