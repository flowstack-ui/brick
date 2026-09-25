import {
  Caption,
  Eyebrow,
  Heading,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";

export function TextSemantics() {
  return (
    <VStack gap={3}>
      <Eyebrow>Workspace guide</Eyebrow>
      <Heading level={2} variant="title-xs">
        A 16px heading
      </Heading>
      <Paragraph>
        A 16px paragraph can share a size without sharing semantics.
      </Paragraph>
      <Caption>Updated today</Caption>
    </VStack>
  );
}
