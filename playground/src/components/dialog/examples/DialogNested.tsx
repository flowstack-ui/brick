import { Button, CloseButton, Dialog } from "@flowstack-ui/brick";

export function DialogNested() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size={{ initial: "lg", sm: "md" }}
          variant="outline"
          tone="neutral"
        >
          Open parent
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
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size={{ initial: "lg", sm: "md" }}>Open child</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Positioner placement="center">
                    <Dialog.Content size="sm">
                      <Dialog.Header>
                        <Dialog.Title>Child dialog</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        The parent remains open behind this dialog.
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.Close asChild>
                          <Button size={{ initial: "lg", sm: "md" }}>
                            Close child
                          </Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Dialog.Portal>
              </Dialog.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button
                  size={{ initial: "lg", sm: "md" }}
                  variant="outline"
                  tone="neutral"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size={{ initial: "lg", sm: "md" }}>Save changes</Button>
            </Dialog.Footer>
            <Dialog.Close placement="corner" asChild>
              <CloseButton size="sm" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
