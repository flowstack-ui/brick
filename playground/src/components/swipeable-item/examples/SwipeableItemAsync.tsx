import { useState } from "react";
import {
  Button,
  HStack,
  Surface,
  SwipeableItem,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SwipeableItemAsync() {
  const [message, setMessage] = useState("Ready to save");
  const [pending, setPending] = useState(false);
  const [attempt, setAttempt] = useState(0);
  async function save() {
    if (pending) return;
    setPending(true);
    setMessage("Saving…");
    try {
      // Simulated transport: fail once so recovery can be tried without a server.
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      if (attempt === 0) throw new Error("Simulated connection failure");
      setMessage("Saved. The row remains available.");
    } catch {
      setMessage("Could not save. Try again.");
    } finally {
      setAttempt((value) => value + 1);
      setPending(false);
    }
  }
  return (
    <VStack gap="3">
      <SwipeableItem.Root variant="outline" readOnly={pending}>
        <SwipeableItem.Content>
          <Surface level="base" inset="md" radius="none">
            <HStack gap="4" justify="between" wrap>
              <VStack gap="1">
                <Text variant="title-sm">Save a record</Text>
                <Text tone="secondary" variant="body-sm">
                  Morgan requested your feedback.
                </Text>
              </VStack>
              <SwipeableItem.Context>
                {(item) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={pending}
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
          <Button loading={pending} variant="ghost" onClick={save}>
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
