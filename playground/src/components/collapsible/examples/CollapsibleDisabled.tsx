import { Collapsible } from "@flowstack-ui/brick";

export function CollapsibleDisabled() {
  return (
    <Collapsible.Root disabled>
      <Collapsible.Trigger>
        Unavailable details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>Details</Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
