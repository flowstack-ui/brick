import { Accordion } from "@flowstack-ui/brick";

export function AccordionNested() {
  return (
    <Accordion.Root indicatorPlacement="start" defaultValue="details">
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            Workspace settings
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            <Accordion.Root indicatorPlacement="end">
              <Accordion.Item value={"details"}>
                <Accordion.Header>
                  <Accordion.Trigger>
                    Notification preferences
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Accordion.ContentInner>
                    Nested state and indicators remain independent.
                  </Accordion.ContentInner>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
