import { Button, CloseButton, Dialog } from "@flowstack-ui/brick";

export function DialogResponsive() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size={{ initial: "lg", sm: "md" }}
          variant="outline"
          tone="neutral"
        >
          Open responsive
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content size={{ initial: "full", md: "lg" }}>
            <Dialog.Header>
              <Dialog.Title>Dialog title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Dialog content goes here. Use this space for a focused task.
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
