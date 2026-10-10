import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerBasic() {
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
                  A focused overlay opened from application code.
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
      <Button
        variant="outline"
        onPress={() => void manager.open("notice", { title: "Dialog title" })}
      >
        Open dialog
      </Button>
      <manager.Viewport />
    </>
  );
}
