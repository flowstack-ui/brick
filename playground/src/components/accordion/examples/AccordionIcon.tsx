import { Accordion, Icon } from "@flowstack-ui/brick";

export function AccordionIcon() {
  return (
    <Accordion.Root>
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 7h18v14H3zM3 7l4-4h10l4 4M12 3v18" />
              </svg>
            </Icon>
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
    </Accordion.Root>
  );
}
