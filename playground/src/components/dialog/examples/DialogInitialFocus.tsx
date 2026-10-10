import { useRef } from "react";
import { Button, CloseButton, Dialog, Field, Input } from "@flowstack-ui/brick";

export function DialogInitialFocus() {
  const input = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size={{ initial: "lg", sm: "md" }}
          variant="outline"
          tone="neutral"
        >
          Open with initial focus
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content initialFocus={input}>
            <Dialog.Header>
              <Dialog.Title>Dialog title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root>
                <Field.Label>Project name</Field.Label>
                <Input ref={input} />
              </Field.Root>
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
