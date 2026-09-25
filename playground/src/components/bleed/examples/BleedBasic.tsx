import {
  Bleed,
  Center,
  Frame,
  Heading,
  Paragraph,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function BleedBasic() {
  return (
    <Surface level="canvas" bordered inset="lg" radius="none">
      <VStack gap="5">
        <Bleed inline="6">
          <Frame blockSize="5rem" asChild>
            <Surface tone="accent" level="subtle" radius="none" asChild>
              <Center>
                <Text>Bleed</Text>
              </Center>
            </Surface>
          </Frame>
        </Bleed>
        <VStack gap="2">
          <Heading level={2} variant="title-sm">
            Some heading
          </Heading>
          <Paragraph tone="secondary">
            The media reaches the edges while the text keeps the container’s
            padding.
          </Paragraph>
        </VStack>
      </VStack>
    </Surface>
  );
}
