import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemMotion() {
  const [, setMessage] = useState("");
  return (
    <VStack gap="4">
      <SwipeableItem.Root
        variant="outline"
        thresholds={{ end: 0.5 }}
        resistance={0.4}
      >
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Resisted overtravel</Text>
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
        <SwipeableItem.Actions side="end" aria-label="Message actions">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <SwipeableItem.Root variant="outline" motion="none">
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Immediate settlement</Text>
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
        <SwipeableItem.Actions side="end" aria-label="Message actions">
          <Button variant="ghost" onClick={() => setMessage("Saved")}>
            Save
          </Button>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
    </VStack>
  );
}
