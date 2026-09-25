import { useState } from "react";
import {
  CloseButton,
  Dialog,
  Menubar,
  createOverlay,
} from "@flowstack-ui/brick";

export function MenubarDialogChain() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(({ title, ...lifecycle }) => (
      <Dialog.Root {...lifecycle}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Description>
                  The menu command opens a managed dialog; the overlay
                  components coordinate dismissal and focus.
                </Dialog.Description>
              </Dialog.Body>
              <Dialog.Close placement="corner" asChild>
                <CloseButton size="sm" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Portal>
      </Dialog.Root>
    )),
  );
  return (
    <>
      <Menubar.Root aria-label="Record commands">
        <Menubar.Menu value="record">
          <Menubar.Trigger>Record actions</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item
              value="details"
              onSelect={() =>
                void manager.open("details", { title: "Record details" })
              }
            >
              Open details dialog
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
      <manager.Viewport />
    </>
  );
}
