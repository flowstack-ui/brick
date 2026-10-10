import { Heading, Paragraph, Surface, VStack } from "@flowstack-ui/brick";

export function SurfaceBasic() {
  return (
    <Surface bordered inset="md">
      <VStack gap="2">
        <Heading level={3} variant="title-sm">
          A calm surface
        </Heading>
        <Paragraph tone="secondary">
          Paint and inset with your own content.
        </Paragraph>
      </VStack>
    </Surface>
  );
}
