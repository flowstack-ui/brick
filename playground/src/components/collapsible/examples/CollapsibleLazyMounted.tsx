import { Collapsible, Input } from "@flowstack-ui/brick";

export function CollapsibleLazyMounted() {
  return (
    <Collapsible.Root unmountOnExit={false}>
      <Collapsible.Trigger>
        Write a note
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <Input
            aria-label="Retained note"
            placeholder="Your note survives closing"
          />
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
