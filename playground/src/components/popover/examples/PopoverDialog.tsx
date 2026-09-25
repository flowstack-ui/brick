import { Button, CloseButton, Dialog, Popover } from "@flowstack-ui/brick";
export function PopoverDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Workspace settings</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Popover.Root
              positioning={{ strategy: "fixed", hideWhenDetached: true }}
            >
              <Popover.Trigger asChild>
                <Button variant="outline">Project settings</Button>
              </Popover.Trigger>
              <Popover.Content inset="md">
                <Popover.Body>
                  <Popover.Title>Inside the dialog</Popover.Title>
                </Popover.Body>
                <Popover.Footer>
                  <Popover.Close asChild>
                    <Button>Done</Button>
                  </Popover.Close>
                </Popover.Footer>
                <Popover.Arrow />
              </Popover.Content>
            </Popover.Root>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
