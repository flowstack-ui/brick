import { AlertDialog, Button, For, HStack } from "@flowstack-ui/brick";

export function AlertDialogMotion() {
  return (
    <HStack gap="3" wrap="wrap">
      <For
        each={
          [
            "scale",
            "slide-in-top",
            "slide-in-bottom",
            "slide-in-left",
            "slide-in-right",
            "none",
          ] as const
        }
      >
        {(motionPreset) => (
          <AlertDialog.Root key={motionPreset}>
            <AlertDialog.Trigger asChild>
              <Button
                variant="outline"
                tone="neutral"
                size={{ initial: "lg", sm: "md" }}
              >
                {motionPreset}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Positioner>
                <AlertDialog.Content motionPreset={motionPreset}>
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
