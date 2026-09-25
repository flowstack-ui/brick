import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemControlled() {
  const [active, setActive] = useState<string | null>(null);
  const [, setMessage] = useState("");
  return (
    <VStack gap="3">
      {["Design review", "Project update", "Travel receipt"].map((title) => (
        <SwipeableItem.Root
          key={title}
          variant="outline"
          openSide={active === title ? "end" : null}
          onOpenSideChange={(side) => setActive(side ? title : null)}
        >
          <SwipeableItem.Content>
            <Surface level="base" inset="md" radius="none">
              <HStack gap="3" justify="between" wrap>
                <Text>{title}</Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActive(title)}
                >
                  More actions
                </Button>
              </HStack>
            </Surface>
          </SwipeableItem.Content>
          <SwipeableItem.Actions side="end" aria-label={`Actions for ${title}`}>
            <Button variant="ghost" onClick={() => setMessage("Saved")}>
              Save
            </Button>
          </SwipeableItem.Actions>
        </SwipeableItem.Root>
      ))}
    </VStack>
  );
}
