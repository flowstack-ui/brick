import { useState } from "react";
import {
  Drawer,
  Button,
  CloseButton,
  Frame,
  Float,
  Surface,
  Paragraph,
} from "@flowstack-ui/brick";
export function DrawerContainer() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  return (
    <Frame blockSize="24rem" asChild>
      <Float.Anchor ref={setContainer}>
        <Surface level="subtle" inset="lg">
          <Paragraph>
            This region provides the containing block. Modality still applies to
            the document.
          </Paragraph>
        </Surface>
        <Drawer.Root closeOnBackdropClick={false}>
          <Drawer.Trigger asChild>
            <Button variant="outline">Contained drawer</Button>
          </Drawer.Trigger>
          {container && (
            <Drawer.Portal container={container}>
              <Drawer.Overlay positioning="absolute" />
              <Drawer.Positioner positioning="absolute" inset="sm">
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Contained drawer</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Paragraph>The panel stays within this region.</Paragraph>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.Close asChild>
                      <Button>Done</Button>
                    </Drawer.Close>
                  </Drawer.Footer>
                  <Drawer.Close placement="corner" asChild>
                    <CloseButton aria-label="Close drawer" />
                  </Drawer.Close>
                </Drawer.Content>
              </Drawer.Positioner>
            </Drawer.Portal>
          )}
        </Drawer.Root>
      </Float.Anchor>
    </Frame>
  );
}
