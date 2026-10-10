import { useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  DropdownMenu,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerMenu() {
  const launcher = useRef<HTMLButtonElement>(null);
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(({ title, ...lifecycle }) => (
      <Dialog.Root {...lifecycle}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Positioner>
            <Dialog.Content finalFocus={launcher}>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Description>
                  The dialog has its own independent menu.
                </Dialog.Description>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="outline">More actions</Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content ariaLabel="Dialog actions">
                    <DropdownMenu.Item
                      value="done"
                      onSelect={() => void manager.close("menu")}
                    >
                      <DropdownMenu.ItemLabel>Finish</DropdownMenu.ItemLabel>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
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
          <Button variant="outline" ref={launcher}>
            Commands
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content ariaLabel="Commands">
            <DropdownMenu.Item
              value="open"
              onSelect={() =>
                void manager.open("menu", { title: "Menu dialog" })
              }
            >
              <DropdownMenu.ItemLabel>Open dialog</DropdownMenu.ItemLabel>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <manager.Viewport />
    </>
  );
}
