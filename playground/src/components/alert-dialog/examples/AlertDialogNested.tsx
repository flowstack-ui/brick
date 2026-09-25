import { AlertDialog, Button, Dialog } from "@flowstack-ui/brick";

export function AlertDialogNested() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Edit draft</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit draft</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Your draft has unsaved changes.</Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Keep editing later</Button>
              </Dialog.Close>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <Button tone="danger">Discard draft</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay />
                  <AlertDialog.Positioner>
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        <AlertDialog.Title>Discard changes?</AlertDialog.Title>
                        <AlertDialog.Description>
                          Unsaved changes cannot be recovered.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                          <Button variant="outline">Keep draft</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button tone="danger">Confirm discard</Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Positioner>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
