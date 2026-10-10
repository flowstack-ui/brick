import { useState } from "react";
import { Button, CloseButton, Dialog } from "@flowstack-ui/brick";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button
      size={{ initial: "lg", sm: "md" }}
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </Button>
  );
}
export function DialogRetained() {
  return (
    <Dialog.Root keepMounted>
      <Dialog.Trigger asChild>
        <Button
          size={{ initial: "lg", sm: "md" }}
          variant="outline"
          tone="neutral"
        >
          Open retained
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Counter />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button
                  size={{ initial: "lg", sm: "md" }}
                  variant="outline"
                  tone="neutral"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size={{ initial: "lg", sm: "md" }}>Save changes</Button>
            </Dialog.Footer>
            <Dialog.Close placement="corner" asChild>
              <CloseButton size="sm" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
