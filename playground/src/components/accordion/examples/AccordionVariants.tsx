import { Accordion, VStack } from "@flowstack-ui/brick";

export function AccordionVariants() {
  return (
    <VStack gap={8}>
      {(
        ["plain", "ghost", "subtle", "enclosed", "soft", "outline"] as const
      ).map((variant) => (
        <Accordion.Root key={variant} variant={variant} defaultValue="details">
          <Accordion.Item value={"details"}>
            <Accordion.Header>
              <Accordion.Trigger>
                {variant} delivery details
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
