import { AlertDialog, Button, For, HStack } from "@flowstack-ui/brick";

export function AlertDialogRadius() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["none", "sm", "control", "surface"] as const}>
        {(radius) => (
          <AlertDialog.Root key={radius}>
            <AlertDialog.Trigger asChild>
              <Button
                variant="outline"
                tone="neutral"
                size={{ initial: "lg", sm: "md" }}
              >
                {radius}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Positioner>
                <AlertDialog.Content radius={radius}>
                  <AlertDialog.Header>
                    <AlertDialog.Title>Delete project?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This permanently removes the project and cannot be undone.
                    </AlertDialog.Description>
                  </AlertDialog.Header>

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
