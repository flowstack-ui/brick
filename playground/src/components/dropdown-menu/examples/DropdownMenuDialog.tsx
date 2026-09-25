import { DropdownMenu, Button, Dialog } from "@flowstack-ui/brick";
export function DropdownMenuDialog() {
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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline" tone="neutral">
                    Actions
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item value="new">New file</DropdownMenu.Item>
                  <DropdownMenu.Item value="open">Open file</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item value="delete" tone="danger">
                    Delete file
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
