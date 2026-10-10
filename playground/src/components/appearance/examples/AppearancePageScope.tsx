import {
  Appearance,
  Heading,
  Paragraph,
  Section,
  Surface,
  VStack,
} from "@flowstack-ui/brick";
export function AppearancePageScope() {
  return (
    <Appearance value="dark">
      <Surface level="canvas" inset="md" asChild>
        <Section as="article" spacing="sm" aria-label="Page appearance example">
          <VStack gap="3">
            <Heading level={3} variant="title-sm">
              A dark page region
            </Heading>
            <Paragraph tone="secondary">
              Place this boundary on your page host. The surrounding
              documentation keeps its own appearance.
            </Paragraph>
          </VStack>
        </Section>
      </Surface>
    </Appearance>
  );
}
