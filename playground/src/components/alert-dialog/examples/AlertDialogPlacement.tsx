import { AlertDialog, Button, For, HStack } from "@flowstack-ui/brick";

export function AlertDialogPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["top", "center", "bottom"] as const}>
        {(placement) => (
          <AlertDialog.Root key={placement}>
            <AlertDialog.Trigger asChild>
              <Button
                variant="outline"
                tone="neutral"
                size={{ initial: "lg", sm: "md" }}
              >
                {placement}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Positioner placement={placement}>
                <AlertDialog.Content>
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
