import { Button, CloseButton, Dialog, Text } from "@flowstack-ui/brick";

export function CloseButtonDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open settings</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Settings</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text>Workspace settings</Text>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton aria-label="Close settings" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
