import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
  useSwipeableItem,
} from "@flowstack-ui/brick";

export function SwipeableItemController() {
  const item = useSwipeableItem();
  return (
    <VStack gap="4">
      <HStack gap="2" wrap>
        <Button size="sm" variant="outline" onClick={() => item.open("end")}>
          Show actions
        </Button>
        <Button size="sm" variant="ghost" onClick={item.close}>
          Close
        </Button>
        <Button size="sm" variant="ghost" onClick={item.reset}>
          Reset without animation
        </Button>
      </HStack>
      <SwipeableItem.RootProvider value={item} variant="outline">
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <Text>Quarterly report</Text>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Report actions">
          <Button variant="ghost">Save</Button>
        </SwipeableItem.Actions>
      </SwipeableItem.RootProvider>
    </VStack>
  );
}
