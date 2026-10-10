import {
  Button,
  Collapsible,
  VStack,
  useCollapsible,
} from "@flowstack-ui/brick";

export function CollapsibleStore() {
  const disclosure = useCollapsible();
  return (
    <VStack gap="3">
      <Button
        variant="outline"
        onPress={() => disclosure.setOpen(!disclosure.open)}
      >
        Toggle from outside
      </Button>
      <Collapsible.RootProvider value={disclosure}>
        <Collapsible.Trigger>
          Store-controlled details
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.ContentInner>
            <Collapsible.Context>
              {({ setOpen }) => (
                <Button onPress={() => setOpen(false)}>
                  Close from context
                </Button>
              )}
            </Collapsible.Context>
          </Collapsible.ContentInner>
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </VStack>
  );
}
