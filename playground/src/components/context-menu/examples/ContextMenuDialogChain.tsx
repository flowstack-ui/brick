import { useState } from "react";
import {
  CloseButton,
  Dialog,
  ContextMenu,
  Surface,
  createOverlay,
} from "@flowstack-ui/brick";

export function ContextMenuDialogChain() {
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
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Record actions: right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item
            value="details"
            onSelect={() =>
              void manager.open("details", { title: "Record details" })
            }
          >
            Open details dialog
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <manager.Viewport />
    </>
  );
}
