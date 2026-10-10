import { Em, Frame, Paragraph, VStack } from "@flowstack-ui/brick";
export function EmWrapping() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="4">
        <Paragraph>
          Read{" "}
          <Em>
            the complete migration instructions before publishing the next
            version
          </Em>{" "}
          to keep changes clear.
        </Paragraph>
        <Paragraph dir="rtl" lang="ar">
          راجع هذا <Em>قبل</Em> النشر.
        </Paragraph>
      </VStack>
    </Frame>
  );
}
