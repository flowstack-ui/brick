import { Accordion, VStack } from "@flowstack-ui/brick";

export function AccordionSizes() {
  return (
    <VStack gap={8}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Accordion.Root key={size} size={size}>
          <Accordion.Item value={"details"}>
            <Accordion.Header>
              <Accordion.Trigger>
                {size} delivery details
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Accordion.ContentInner>
                Standard delivery takes three to five business days.
              </Accordion.ContentInner>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </VStack>
  );
}
