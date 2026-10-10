import { Menubar, Button, Dialog } from "@flowstack-ui/brick";
export function MenubarDialog() {
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
              <Menubar.Root aria-label="Actions">
                <Menubar.Menu value="file">
                  <Menubar.Trigger>Actions</Menubar.Trigger>
                  <Menubar.Content>
                    <Menubar.Item value="new">New file</Menubar.Item>
                    <Menubar.Item value="open">Open file</Menubar.Item>
                    <Menubar.Separator />
                    <Menubar.Item value="delete" tone="danger">
                      Delete file
                    </Menubar.Item>
                  </Menubar.Content>
                </Menubar.Menu>
                <Menubar.Menu value="edit">
                  <Menubar.Trigger>Edit</Menubar.Trigger>
                  <Menubar.Content>
                    <Menubar.Item value="undo">Undo</Menubar.Item>
                    <Menubar.Item disabled value="redo">
                      Redo
                    </Menubar.Item>
                  </Menubar.Content>
                </Menubar.Menu>
              </Menubar.Root>
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
