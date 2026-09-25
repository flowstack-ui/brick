import { LinkBox, Paragraph, Surface, VStack } from "@flowstack-ui/brick";

export function LinkBoxComposition() {
  return (
    <LinkBox.Root>
      <Surface bordered inset="lg">
        <VStack gap="3">
          <LinkBox.Link asChild href="#usage">
            <a>Composed destination</a>
          </LinkBox.Link>
          <Paragraph tone="secondary">
            A router anchor can own routing while forwarding props and its ref.
          </Paragraph>
        </VStack>
      </Surface>
    </LinkBox.Root>
  );
}
