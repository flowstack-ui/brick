import { Accordion, HStack, Stack, Button } from "@flowstack-ui/brick";

export function AccordionActions() {
  return (
    <Accordion.Root>
      <Accordion.Item value="billing">
        <HStack gap={3}>
          <Stack.Item grow={1}>
            <Accordion.Header>
              <Accordion.Trigger>
                Billing details
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Header>
          </Stack.Item>
          <Button
            size="sm"
            variant="subtle"
            onClick={() => window.alert("Billing action")}
          >
            Edit
          </Button>
        </HStack>
        <Accordion.Content>
          <Accordion.ContentInner>
            Your next invoice arrives on the first of the month.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
