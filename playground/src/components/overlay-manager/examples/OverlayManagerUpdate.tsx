import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Input,
  VStack,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerUpdate() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(function Notice({
      title,
      ...lifecycle
    }) {
      const [draft, setDraft] = useState("");
      return (
        <Dialog.Root {...lifecycle}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap="3">
                    <Dialog.Description>
                      Updating props keeps this input mounted.
                    </Dialog.Description>
                    <Input
                      aria-label="Draft"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                    />
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button
                    onPress={() =>
                      manager.update("notice", { title: "Updated title" })
                    }
                  >
                    Update title
                  </Button>
                </Dialog.Footer>
                <Dialog.Close placement="corner" asChild>
                  <CloseButton size="sm" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Portal>
        </Dialog.Root>
      );
    }),
  );
  return (
    <>
      <Button
        variant="outline"
        onPress={() => void manager.open("notice", { title: "Original title" })}
      >
        Open update
      </Button>
      <manager.Viewport />
    </>
  );
}
