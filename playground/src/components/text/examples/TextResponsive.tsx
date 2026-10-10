import { Heading, Paragraph, VStack } from "@flowstack-ui/brick";

export function TextResponsive() {
  return (
    <VStack gap={3}>
      <Heading level={2} variant={{ initial: "title-md", lg: "display-sm" }}>
        A responsive title
      </Heading>
      <Paragraph align={{ initial: "start", lg: "center" }}>
        The heading level stays the same as its visual recipe changes.
      </Paragraph>
    </VStack>
  );
}
