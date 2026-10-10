import { Frame, Surface, Text, VStack } from "@flowstack-ui/brick";
export function FrameInline() {
  return (
    <VStack gap="4">
      <Frame inlineSize="60%" asChild>
        <Surface inset="md" level="subtle">
          <Text>60% of the parent</Text>
        </Surface>
      </Frame>
      <Frame maxInlineSize="32ch" asChild>
        <Surface inset="md" level="subtle">
          <Text>
            This readable region stops growing at 32ch, but fits a narrower
            parent.
          </Text>
        </Surface>
      </Frame>
      <Frame minInlineSize="10rem" asChild>
        <Surface inset="md" level="subtle">
          <Text>At least 10rem</Text>
        </Surface>
      </Frame>
    </VStack>
  );
}
