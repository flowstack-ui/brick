import { Collapsible } from "@flowstack-ui/brick";

export function CollapsibleResponsive() {
  return (
    <Collapsible.Root
      size={{ initial: "sm", md: "lg" }}
      variant={{ initial: "plain", md: "outline" }}
    >
      <Collapsible.Trigger>
        Responsive details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          Resize the viewport: the larger outlined disclosure starts at the
          medium breakpoint.
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
