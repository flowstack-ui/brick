import {
  Container,
  Paragraph,
  Section,
  Surface,
  VStack,
} from "@flowstack-ui/brick";

export function ContainerAlignment() {
  return (
    <VStack gap="4">
      <Surface level="subtle" radius="none">
        <Container gutter="lg">
          <Section as="div" spacing="sm">
            <Paragraph>The first region shares its content edges.</Paragraph>
          </Section>
        </Container>
      </Surface>
      <Surface level="canvas" radius="none">
        <Container gutter="lg">
          <Section as="div" spacing="sm">
            <Paragraph>
              The second region uses the same measure and gutter.
            </Paragraph>
          </Section>
        </Container>
      </Surface>
    </VStack>
  );
}
