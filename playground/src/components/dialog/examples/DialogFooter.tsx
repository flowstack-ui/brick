import { Button, CloseButton, Dialog, For, HStack } from "@flowstack-ui/brick";

export function DialogFooter() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["start", "center", "end", "between"] as const}>
        {(value) => (
          <Dialog.Root key={value}>
            <Dialog.Trigger asChild>
              <Button
                size={{ initial: "lg", sm: "md" }}
                variant="outline"
                tone="neutral"
              >
                {value}
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    Dialog content goes here. Use this space for a focused task.
                  </Dialog.Body>
                  <Dialog.Footer justify={value}>
                    <Dialog.Close asChild>
                      <Button
                        size={{ initial: "lg", sm: "md" }}
                        variant="outline"
                        tone="neutral"
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button size={{ initial: "lg", sm: "md" }}>
                      Save changes
                    </Button>
                  </Dialog.Footer>
                  <Dialog.Close placement="corner" asChild>
                    <CloseButton size="sm" />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </For>
    </HStack>
  );
}
