import { useState } from "react";
import { Bookmark, MoreHorizontal } from "lucide-react";
import {
  HStack,
  IconButton,
  Link,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemComposition() {
  const [saved, setSaved] = useState(false);
  return (
    <VStack gap="3">
      <SwipeableItem.Root variant="outline" radius="lg">
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack justify="between" gap="4">
              <Link href="#usage">Read the usage guide</Link>
              <SwipeableItem.Context>
                {(item) => (
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Show guide actions"
                    onClick={() => item.open("end")}
                  >
                    <MoreHorizontal />
                  </IconButton>
                )}
              </SwipeableItem.Context>
            </HStack>
          </Surface>
        </SwipeableItem.Content>
        <SwipeableItem.Actions
          side="end"
          aria-label="Guide actions"
          gap="3"
          inset="3"
        >
          <IconButton
            size="sm"
            variant="soft"
            aria-label={saved ? "Remove bookmark" : "Bookmark guide"}
            onClick={() => setSaved(!saved)}
          >
            <Bookmark />
          </IconButton>
          <Link href="#props">Props</Link>
        </SwipeableItem.Actions>
      </SwipeableItem.Root>
      <Text role="status" tone="secondary">
        {saved ? "Guide bookmarked" : "Guide not bookmarked"}
      </Text>
    </VStack>
  );
}
