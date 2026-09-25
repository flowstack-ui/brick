import {
  AlertDialog,
  Button,
  For,
  HStack,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";

export function AlertDialogScrolling() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["inside", "outside"] as const}>
        {(scrollBehavior) => (
          <AlertDialog.Root key={scrollBehavior}>
            <AlertDialog.Trigger asChild>
              <Button
                variant="outline"
                tone="neutral"
                size={{ initial: "lg", sm: "md" }}
              >
                {scrollBehavior}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Positioner scrollBehavior={scrollBehavior}>
                <AlertDialog.Content>
                  <AlertDialog.Header>
                    <AlertDialog.Title>Delete project?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This permanently removes the project and cannot be undone.
                    </AlertDialog.Description>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <VStack gap="4">
                      <For
                        each={Array.from(
                          { length: 20 },
                          (_, index) => index + 1,
                        )}
                      >
                        {(index) => (
                          <Paragraph key={index}>
                            Affected record {index}: this associated record will
                            also be removed.
                          </Paragraph>
                        )}
                      </For>
                    </VStack>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <AlertDialog.Cancel asChild>
                      <Button
                        variant="outline"
                        tone="neutral"
                        size={{ initial: "lg", sm: "md" }}
                      >
                        Keep project
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <Button tone="danger" size={{ initial: "lg", sm: "md" }}>
                        Delete project
                      </Button>
                    </AlertDialog.Action>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog.Positioner>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        )}
      </For>
    </HStack>
  );
}
