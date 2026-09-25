import { ContextMenu, Button, Surface, Dialog } from "@flowstack-ui/brick";
export function ContextMenuDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Open dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Workspace settings</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                  <Surface bordered inset="lg" radius="sm" tabIndex={0}>
                    Actions: right-click or press Shift+F10
                  </Surface>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item value="new">New file</ContextMenu.Item>
                  <ContextMenu.Item value="open">Open file</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item value="delete" tone="danger">
                    Delete file
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline" tone="neutral">
                  Close
                </Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
