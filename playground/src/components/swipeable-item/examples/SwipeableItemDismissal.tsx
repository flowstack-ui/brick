import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemDismissal() {
  const [message, setMessage] = useState(
    "Actions stay open until you tap the row or outside.",
  );
  return (
    <VStack gap="3">
      <SwipeableItem.Root
        variant="outline"
        closeOnOutsideClick
        closeOnContentClick
      >
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Dismissible actions</Text>
                <Text tone="secondary" variant="body-sm">
                  Morgan requested your feedback.
                </Text>
              </VStack>
              <SwipeableItem.Context>
                {(item) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => item.open("end")}
                  >
                    More actions
                  </Button>
                )}
              </SwipeableItem.Context>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions
          side="end"
          aria-label="Message actions"
          closeOnClick={false}
        >
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <Text role="status" tone="secondary">
        {message}
      </Text>
    </VStack>
  );
}
