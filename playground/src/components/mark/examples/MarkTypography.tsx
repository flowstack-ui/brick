import { Heading, Mark, Paragraph, VStack } from "@flowstack-ui/brick";
export function MarkTypography() {
  return (
    <VStack gap="4">
      <Heading level={3} variant="title-lg">
        A <Mark>relevant heading</Mark>
      </Heading>
      <Paragraph variant="body-lg">
        Mark inherits the <Mark>surrounding type size and weight</Mark>.
      </Paragraph>
    </VStack>
  );
}
