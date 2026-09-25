import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  DropdownMenu,
  VStack,
  createOverlay,
} from "@flowstack-ui/brick";
export function DropdownMenuDialogChain() {
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
                <VStack gap="4" align="start">
                  <Dialog.Description>
                    These commands belong to the dialog's overlay boundary.
                  </Dialog.Description>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="outline" tone="neutral">
                        Dialog commands
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item value="copy">
                        Copy details
                      </DropdownMenu.Item>
                      <DropdownMenu.Item value="export">
                        Export record
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </VStack>
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Record actions
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            value="details"
            onSelect={() =>
              void manager.open("details", { title: "Record details" })
            }
          >
            Open details dialog
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <manager.Viewport />
    </>
  );
}
