import { Frame, Highlight, Paragraph, VStack } from "@flowstack-ui/brick";
export function HighlightWrapping() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="4">
        <Paragraph variant="body-lg">
          <Highlight
            text="A durable design system keeps meaningful content readable across narrow screens."
            query="durable design system keeps meaningful content readable"
          />
        </Paragraph>
        <Paragraph dir="rtl" lang="ar">
          <Highlight
            text="يبقى النظام الجيد واضحًا عبر الشاشات والسياقات المختلفة."
            query="النظام"
            exactMatch
          />
        </Paragraph>
      </VStack>
    </Frame>
  );
}
