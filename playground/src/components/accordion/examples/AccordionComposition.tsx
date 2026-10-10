import { Accordion, VStack, HStack, Button, Text } from "@flowstack-ui/brick";

export function AccordionComposition() {
  return (
    <Accordion.Root unstyled>
      <Accordion.Item value="advanced" asChild>
        <VStack gap={3} align="stretch">
          <Accordion.Header>
            <Accordion.Trigger asChild>
              <Button variant="outline">
                <HStack asChild gap={2}>
                  <span>
                    Advanced options
                    <Accordion.Indicator />
                  </span>
                </HStack>
              </Button>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content motion="none">
            <Accordion.ContentInner asChild inset="none">
              <VStack gap={3}>
                <Text>
                  Layout owns spacing and Button owns the trigger recipe.
                </Text>
              </VStack>
            </Accordion.ContentInner>
          </Accordion.Content>
        </VStack>
      </Accordion.Item>
    </Accordion.Root>
  );
}
