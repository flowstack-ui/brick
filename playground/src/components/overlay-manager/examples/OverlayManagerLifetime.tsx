import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Input,
  Text,
  VStack,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerLifetime() {
  const [mounted, setMounted] = useState(true);
  const [status, setStatus] = useState("No pending work.");
  const [manager] = useState(() =>
    createOverlay<{ id: string; title: string }, void>(
      ({ id, title, ...lifecycle }) => (
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
                      Each ID owns an independent instance. A replacement resets
                      local state.
                    </Dialog.Description>
                    <Input aria-label="Instance draft" />
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <HStack gap="2" wrap>
                    <Button
                      onPress={() =>
                        void manager.open("second", {
                          id: "second",
                          title: "Second instance",
                        })
                      }
                    >
                      Open second
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => {
                        void manager.close(id);
                        void manager.open(id, {
                          id,
                          title: "Replacement instance",
                        });
                      }}
                    >
                      Replace
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => manager.remove(id)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => manager.removeAll()}
                    >
                      Remove all
                    </Button>
                    <Button variant="outline" onPress={() => setMounted(false)}>
                      Dispose host
                    </Button>
                  </HStack>
                </Dialog.Footer>
                <Dialog.Close placement="corner" asChild>
                  <CloseButton size="sm" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Portal>
        </Dialog.Root>
      ),
    ),
  );
  function cancelBeforeMount() {
    void manager.open("quick", { id: "quick", title: "Never shown" });
    void manager
      .close("quick")
      .then(() =>
        setStatus(
          manager.has("quick") ? "Still pending" : "Cancelled before display.",
        ),
      );
  }
  return (
    <VStack gap="3" align="start">
      <HStack gap="2" wrap>
        <Button
          variant="outline"
          disabled={!mounted}
          onPress={() =>
            void manager
              .open("first", { id: "first", title: "First instance" })
              .then(() => setStatus("First result settled."))
          }
        >
          Open instances
        </Button>
        <Button
          variant="outline"
          disabled={!mounted}
          onPress={cancelBeforeMount}
        >
          Open and immediately close
        </Button>
        {!mounted ? (
          <Button onPress={() => setMounted(true)}>Remount host</Button>
        ) : null}
      </HStack>
      <Text role="status">{status}</Text>
      {mounted ? <manager.Viewport /> : null}
    </VStack>
  );
}
