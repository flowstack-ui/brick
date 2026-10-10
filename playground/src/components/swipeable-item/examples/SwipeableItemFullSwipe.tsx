import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemFullSwipe() {
  const [read, setRead] = useState(false);
  return (
    <VStack gap="3">
      <SwipeableItem.Root
        variant="outline"
        fullSwipeSides={["end"]}
        onFullSwipe={() => setRead(true)}
      >
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <Text variant="title-sm">Release a full swipe to mark read</Text>
              <Button size="sm" variant="ghost" onClick={() => setRead(!read)}>
                {read ? "Mark unread" : "Mark read"}
              </Button>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Read status">
          <Button variant="ghost" onClick={() => setRead(true)}>
            Mark read
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <Text role="status" tone="secondary">
        {read ? "Marked as read" : "Unread"}
      </Text>
    </VStack>
  );
}
