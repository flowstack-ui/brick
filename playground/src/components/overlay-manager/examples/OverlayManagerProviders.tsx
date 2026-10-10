import { useState } from "react";
import {
  Appearance,
  Button,
  CloseButton,
  Dialog,
  FormatNumber,
  LocaleProvider,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerProviders() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(({ title, ...lifecycle }) => (
      <Dialog.Root {...lifecycle}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Appearance value="dark">
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.Description>
                    Formatted by the host's German locale:{" "}
                    <FormatNumber value={123456.78} />
                  </Dialog.Description>
                </Dialog.Body>
                <Dialog.Close placement="corner" asChild>
                  <CloseButton size="sm" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Positioner>
          </Appearance>
        </Dialog.Portal>
      </Dialog.Root>
    )),
  );
  return (
    <>
      <Button
        variant="outline"
        onPress={() =>
          void manager.open("locale", { title: "Local providers" })
        }
      >
        Open localized dialog
      </Button>
      <LocaleProvider locale="de-DE">
        <manager.Viewport />
      </LocaleProvider>
    </>
  );
}
