import {
  Button,
  CloseButton,
  Dialog,
  For,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";

export function DialogOutside() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size={{ initial: "lg", sm: "md" }}
          variant="outline"
          tone="neutral"
        >
          Open outside scroll
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
              <VStack gap="4">
                <For each={Array.from({ length: 20 }, (_, i) => i + 1)}>
                  {(number) => (
                    <Paragraph key={number}>
                      Section {number}. Review this information before saving
                      your preferences. The whole dialog scrolls within its
                      viewport boundary.
                    </Paragraph>
                  )}
                </For>
              </VStack>
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
