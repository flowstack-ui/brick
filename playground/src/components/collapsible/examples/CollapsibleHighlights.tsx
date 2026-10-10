import { Collapsible, For, Paragraph, VStack } from "@flowstack-ui/brick";

export function CollapsibleHighlights() {
  return (
    <VStack gap="4">
      <For each={["none", "hover", "open", "both"] as const}>
        {(highlight) => (
          <Collapsible.Root key={highlight} variant="outline">
            <Collapsible.Trigger highlight={highlight}>
              {highlight}
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.ContentInner>
                <Paragraph tone="secondary">
                  Keyboard focus remains visible with every highlight setting.
                </Paragraph>
              </Collapsible.ContentInner>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </For>
    </VStack>
  );
}
