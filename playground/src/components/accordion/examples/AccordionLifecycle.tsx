import { Accordion, Input } from "@flowstack-ui/brick";

export function AccordionLifecycle() {
  return (
    <Accordion.Root lazyMount unmountOnExit={false}>
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            Delivery note
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            <Input
              aria-label="Delivery note"
              placeholder="Your draft survives closing"
            />
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
