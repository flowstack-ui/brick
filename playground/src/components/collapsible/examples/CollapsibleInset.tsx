import { Collapsible, Paragraph, VStack } from "@flowstack-ui/brick";

export function CollapsibleInset() {
  return (
    <Collapsible.Root defaultOpen variant="outline">
      <Collapsible.Trigger>
        Layout-owned spacing
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content motion="none">
        <Collapsible.ContentInner inset="none" asChild>
          <VStack gap="3">
            <Paragraph>ContentInner adds no padding here.</Paragraph>
            <Paragraph tone="secondary">
              The composed layout owns the content spacing.
            </Paragraph>
          </VStack>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
