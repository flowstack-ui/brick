import { Container, Paragraph, Surface } from "@flowstack-ui/brick";

export function ContainerBasic() {
  return (
    <Container>
      <Surface level="subtle" inset="md" radius="none">
        <Paragraph>
          A centered content boundary keeps your page readable while its gutters
          leave room on both sides.
        </Paragraph>
      </Surface>
    </Container>
  );
}
