import {
  Container,
  Heading,
  Paragraph,
  Section,
  VStack,
} from "@flowstack-ui/brick";

export function SectionBasic() {
  return (
    <Section spacing="sm">
      <Container gutter="sm">
        <VStack gap="2">
          <Heading level={3} variant="title-sm">
            A section of the page
          </Heading>
          <Paragraph tone="secondary">
            Consistent block spacing around related content.
          </Paragraph>
        </VStack>
      </Container>
    </Section>
  );
}
