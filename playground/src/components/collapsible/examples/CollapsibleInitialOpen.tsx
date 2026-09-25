import { Collapsible, Paragraph } from "@flowstack-ui/brick";

export function CollapsibleInitialOpen() {
  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger>
        Initially open
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <Paragraph>
            This content is visible on the first render, without an entrance
            animation.
          </Paragraph>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
