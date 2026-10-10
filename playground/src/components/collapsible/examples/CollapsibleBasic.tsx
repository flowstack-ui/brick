import { Collapsible, Paragraph } from "@flowstack-ui/brick";

export function CollapsibleBasic() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        Explore the details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <Paragraph tone="secondary">
            Reveal related information without leaving the page.
          </Paragraph>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
