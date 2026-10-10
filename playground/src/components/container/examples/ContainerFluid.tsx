import { Container, Paragraph, Surface } from "@flowstack-ui/brick";

export function ContainerFluid() {
  return (
    <Container measure="full">
      <Surface level="subtle" inset="md" radius="none">
        <Paragraph>
          Fill the available parent width while keeping the default logical
          gutters.
        </Paragraph>
      </Surface>
    </Container>
  );
}
