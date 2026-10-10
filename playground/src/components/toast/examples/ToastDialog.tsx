import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Toaster,
  createToaster,
} from "@flowstack-ui/brick";
export function ToastDialog() {
  const [toaster] = useState(() => createToaster());
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) toaster.remove();
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline">Open notification dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Save changes</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Button
                variant="outline"
                onClick={() =>
                  toaster.success("Dialog changes saved", {
                    duration: Infinity,
                  })
                }
              >
                Notify inside dialog
              </Button>
            </Dialog.Body>
            <Dialog.Close placement="corner" asChild>
              <CloseButton />
            </Dialog.Close>
            <Toaster toaster={toaster} label="Dialog notifications" />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
