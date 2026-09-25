import { Collapsible } from "@flowstack-ui/brick";

export function CollapsibleNested() {
  return (
    <Collapsible.Root defaultOpen variant="outline">
      <Collapsible.Trigger>
        Parent details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <Collapsible.Root variant="soft">
            <Collapsible.Trigger>
              Independent child
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.ContentInner>
                Each indicator follows its own disclosure.
              </Collapsible.ContentInner>
            </Collapsible.Content>
          </Collapsible.Root>
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
