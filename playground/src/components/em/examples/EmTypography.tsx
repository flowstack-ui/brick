import { Em, Heading, Paragraph, VStack } from "@flowstack-ui/brick";
export function EmTypography() {
  return (
    <VStack gap="4">
      <Heading level={3} variant="title-md">
        Read this <Em>first</Em>
      </Heading>
      <Paragraph variant="body-lg">
        This is <Em>especially</Em> important.
      </Paragraph>
      <Paragraph tone="secondary">
        Keep the <Em>exact</Em> version.
      </Paragraph>
    </VStack>
  );
}
