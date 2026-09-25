import {
  Frame,
  Heading,
  Paragraph,
  Spinner,
  Surface,
  VStack,
  ZStack,
} from "@flowstack-ui/brick";
export function SpinnerOverlay() {
  return (
    <Frame maxInlineSize="24rem">
      <ZStack.Root>
        <ZStack.Item>
          <Surface inset="lg" bordered radius="md" aria-busy="true">
            <VStack gap="3">
              <Heading level={3} variant="title-sm">
                Workspace report
              </Heading>
              <Paragraph tone="secondary">
                Your latest activity and team summary are being refreshed.
              </Paragraph>
            </VStack>
          </Surface>
        </ZStack.Item>
        <ZStack.Item layer="content" asChild>
          <Surface level="transparent" radius="md">
            <Surface.Scrim strength="soft" />
          </Surface>
        </ZStack.Item>
        <ZStack.Item layer="action" align="center" justify="center">
          <Spinner label="Refreshing workspace report" size="lg" />
        </ZStack.Item>
      </ZStack.Root>
    </Frame>
  );
}
