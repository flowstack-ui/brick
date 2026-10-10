import { Button, Collapsible, Paragraph, VStack } from "@flowstack-ui/brick";

export function CollapsiblePartialHeight() {
  return (
    <Collapsible.Root collapsedHeight="3rem">
      <Collapsible.Trigger>
        Read more
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <VStack gap="4">
            <Paragraph>
              A short preview introduces the topic before you reveal the rest.
            </Paragraph>
            <Paragraph>
              Additional details become available when the disclosure is open.
            </Paragraph>
            <Button variant="outline">Continue</Button>
          </VStack>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
