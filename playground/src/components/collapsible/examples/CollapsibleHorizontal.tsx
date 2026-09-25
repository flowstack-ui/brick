import { Collapsible, Frame, Paragraph } from "@flowstack-ui/brick";

export function CollapsibleHorizontal() {
  return (
    <Collapsible.Root orientation="horizontal" variant="outline">
      <Collapsible.Trigger iconOnly aria-label="Reveal horizontally">
        <Collapsible.Indicator placement="inline" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <Frame inlineSize="14rem">
            <Paragraph>
              This content expands horizontally and hides completely when
              closed.
            </Paragraph>
          </Frame>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
