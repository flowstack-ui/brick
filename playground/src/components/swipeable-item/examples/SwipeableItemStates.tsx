import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemStates() {
  const [, setMessage] = useState("");
  return (
    <VStack gap="4">
      <SwipeableItem.Root variant="outline" disabled>
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Disabled</Text>
                <Text tone="secondary" variant="body-sm">
                  Morgan requested your feedback.
                </Text>
              </VStack>
              <SwipeableItem.Context>
                {(item) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={item.disabled || item.readOnly}
                    onClick={() => item.open("end")}
                  >
                    More actions
                  </Button>
                )}
              </SwipeableItem.Context>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Message actions">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <SwipeableItem.Root variant="outline" readOnly>
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Read only</Text>
                <Text tone="secondary" variant="body-sm">
                  Morgan requested your feedback.
                </Text>
              </VStack>
              <SwipeableItem.Context>
                {(item) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={item.disabled || item.readOnly}
                    onClick={() => item.open("end")}
                  >
                    More actions
                  </Button>
                )}
              </SwipeableItem.Context>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Message actions">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <SwipeableItem.Root variant="outline" dir="rtl">
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">مراجعة التصميم</Text>
                <Text tone="secondary" variant="body-sm">
                  Morgan requested your feedback.
                </Text>
              </VStack>
              <SwipeableItem.Context>
                {(item) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={item.disabled || item.readOnly}
                    onClick={() => item.open("end")}
                  >
                    More actions
                  </Button>
                )}
              </SwipeableItem.Context>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions side="end" aria-label="Message actions">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
    </VStack>
  );
}
