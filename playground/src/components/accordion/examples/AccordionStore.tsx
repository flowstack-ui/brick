import {
  Accordion,
  VStack,
  HStack,
  Button,
  useAccordion,
} from "@flowstack-ui/brick";

export function AccordionStore() {
  const api = useAccordion({ defaultValue: "shipping" });
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => api.setValue(["returns"])}
        >
          Show returns
        </Button>
        <Button size="sm" variant="ghost" onClick={() => api.setValue([])}>
          Close all
        </Button>
      </HStack>
      <Accordion.RootProvider value={api}>
        {[
          {
            value: "shipping",
            title: "When will my order arrive?",
            body: "Standard delivery takes three to five business days.",
          },
          {
            value: "returns",
            title: "Can I return an item?",
            body: "Unused items can be returned within 30 days.",
          },
        ].map((item) => (
          <Accordion.Item value={item.value} key={item.value}>
            <Accordion.Header>
              <Accordion.Trigger>
                {item.title}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Accordion.ContentInner>{item.body}</Accordion.ContentInner>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.RootProvider>
    </VStack>
  );
}
