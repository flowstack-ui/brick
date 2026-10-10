import { useState } from "react";
import { AlertDialog, Button } from "@flowstack-ui/brick";

export function AlertDialogControlled() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Controlled decision</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Positioner>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Remove project?</AlertDialog.Title>
              <AlertDialog.Description>
                Confirm the removal. This demo lets you finish the simulated
                operation explicitly.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel asChild>
                <Button variant="outline" onClick={() => setPending(false)}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  tone="danger"
                  onClick={(event) => {
                    if (!pending) {
                      event.preventDefault();
                      setPending(true);
                    } else setPending(false);
                  }}
                >
                  {pending ? "Finish removal" : "Start removal"}
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Positioner>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
