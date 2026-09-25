import { Accordion, VStack, Text } from "@flowstack-ui/brick";

export function AccordionSubtext() {
  return (
    <Accordion.Root>
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            <VStack asChild gap={1} align="start">
              <span>
                <Text as="span">Delivery options</Text>
                <Text as="span" variant="body-sm" tone="secondary">
                  Choose when your order arrives
                </Text>
              </span>
            </VStack>
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            Express shipping is available at checkout.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
