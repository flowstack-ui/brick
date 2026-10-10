import {
  Container,
  Heading,
  Paragraph,
  Section,
  Surface,
  VStack,
} from "@flowstack-ui/brick";

export function SectionComposition() {
  return (
    <Surface level="subtle" asChild>
      <Section spacing="sm">
        <Container gutter="sm">
          <VStack gap="2">
            <Heading level={3} variant="title-sm">
              One painted region
            </Heading>
            <Paragraph tone="secondary">
              Separate ownership without an extra painted wrapper.
            </Paragraph>
          </VStack>
        </Container>
      </Section>
    </Surface>
  );
}
