import {
  Heading,
  LinkBox,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";

export function LinkBoxBasic() {
  return (
    <LinkBox.Root>
      <Surface bordered inset="lg">
        <VStack gap="3">
          <Heading level={3} variant="title-sm">
            <LinkBox.Link href="#usage">Build a better workspace</LinkBox.Link>
          </Heading>
          <Paragraph tone="secondary">
            The entire region opens the article using a real link.
          </Paragraph>
        </VStack>
      </Surface>
    </LinkBox.Root>
  );
}
