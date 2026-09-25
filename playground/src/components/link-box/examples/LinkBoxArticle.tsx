import {
  Heading,
  LinkBox,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";

export function LinkBoxArticle() {
  return (
    <LinkBox.Root as="article">
      <Surface bordered inset="lg">
        <VStack gap="3">
          <Paragraph tone="secondary" variant="body-sm">
            September 12, 2026
          </Paragraph>
          <Heading level={3} variant="title-sm">
            <LinkBox.Link href="#usage">Designing with intention</LinkBox.Link>
          </Heading>
          <Paragraph tone="secondary">
            One primary destination; no nested interactive elements.
          </Paragraph>
        </VStack>
      </Surface>
    </LinkBox.Root>
  );
}
