import { Accordion } from "@flowstack-ui/brick";

export function AccordionCustomIndicator() {
  return (
    <Accordion.Root>
      <Accordion.Item value="details">
        <Accordion.Header>
          <Accordion.Trigger>
            Order details
            <Accordion.ItemContext>
              {({ isOpen }) => (
                <Accordion.Indicator>{isOpen ? "−" : "+"}</Accordion.Indicator>
              )}
            </Accordion.ItemContext>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            Artwork reads its nearest item state.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
