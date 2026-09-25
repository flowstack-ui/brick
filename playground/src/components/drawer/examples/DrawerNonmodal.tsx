import {
  Drawer,
  Button,
  CloseButton,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";
import { useState } from "react";
export function DrawerNonmodal() {
  const [count, setCount] = useState(0);
  return (
    <VStack gap="3">
      <Button onClick={() => setCount(count + 1)}>
        Background count: {count}
      </Button>
      <Drawer.Root modal={false} closeOnBackdropClick={false}>
        <Drawer.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Nonmodal drawer
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Nonmodal drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Paragraph>
                  The page remains interactive. Close this temporary panel when
                  you finish.
                </Paragraph>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button variant="outline" tone="neutral">
                    Cancel
                  </Button>
                </Drawer.Close>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.Close asChild placement="corner">
                <CloseButton aria-label="Close drawer" />
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Portal>
      </Drawer.Root>
    </VStack>
  );
}
