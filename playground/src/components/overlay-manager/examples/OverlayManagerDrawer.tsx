import { useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerDrawer() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(({ title, ...lifecycle }) => (
      <Drawer.Root {...lifecycle}>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Drawer.Description>
                  A focused overlay opened from application code.
                </Drawer.Description>
              </Drawer.Body>
              <Drawer.Close placement="corner" asChild>
                <CloseButton size="sm" />
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Portal>
      </Drawer.Root>
    )),
  );
  return (
    <>
      <Button
        variant="outline"
        onPress={() => void manager.open("notice", { title: "Drawer title" })}
      >
        Open drawer
      </Button>
      <manager.Viewport />
    </>
  );
}
