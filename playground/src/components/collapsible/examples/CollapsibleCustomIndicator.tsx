import { Collapsible } from "@flowstack-ui/brick";

export function CollapsibleCustomIndicator() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        Custom indicator
        <Collapsible.Context>
          {({ open }) => (
            <Collapsible.Indicator>{open ? "−" : "+"}</Collapsible.Indicator>
          )}
        </Collapsible.Context>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          Indicators are decorative; the trigger exposes expanded state.
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
