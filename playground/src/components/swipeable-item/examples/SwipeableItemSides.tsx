import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemSides() {
  const [message, setMessage] = useState("No action selected");
  return (
    <VStack gap="3">
      <SwipeableItem.Root variant="outline">
        <SwipeableItem.Actions side="start" aria-label="Archive message">
          <Button variant="ghost" onClick={() => setMessage("Archived")}>
            Archive
          </Button>
        </SwipeableItem.Actions>
        <SwipeableItem.Content>
          <Surface level="base" radius="none" inset="md">
            <VStack gap="3">
              <Text variant="title-sm">Project update</Text>
              <SwipeableItem.Context>
                {(item) => (
                  <HStack gap="2" wrap>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => item.open("start")}
                    >
                      Archive actions
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => item.open("end")}
                    >
                      Save actions
                    </Button>
                  </HStack>
                )}
              </SwipeableItem.Context>
            </VStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Save message" gap="2">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setMessage("Pinned")}>
            Pin
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <Text role="status">{message}</Text>
    </VStack>
  );
}
