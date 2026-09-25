import { Accordion } from "@flowstack-ui/brick";

export function AccordionDisabled() {
  return (
    <Accordion.Root>
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            Delivery details
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            Standard delivery is included.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value={"returns"} disabled>
        <Accordion.Header>
          <Accordion.Trigger>
            Returns unavailable
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            Returns are temporarily unavailable.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
