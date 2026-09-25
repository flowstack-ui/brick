import { Frame, Paragraph, VStack } from "@flowstack-ui/brick";

export function TextOverflow() {
  return (
    <Frame maxInlineSize={320}>
      <VStack gap={4}>
        <Paragraph truncate>
          A single long line is shortened when it exceeds the available width.
        </Paragraph>
        <Paragraph lineClamp={2}>
          This paragraph has enough content to demonstrate two lines of
          clamping. Make important hidden information available elsewhere in
          your application.
        </Paragraph>
        <Paragraph lineClamp={{ initial: 1, md: "none" }}>
          This responsive paragraph uses one line on small viewports and
          restores all of its content from the medium breakpoint onward.
        </Paragraph>
      </VStack>
    </Frame>
  );
}
