import { Button, ToggleTip, Dialog, CloseButton } from "@flowstack-ui/brick";

export function ToggleTipDialog() {
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
            <ToggleTip.Root
              portalled={false}
              positioning={{ strategy: "fixed", hideWhenDetached: true }}
            >
              <ToggleTip.Trigger asChild>
                <Button variant="outline">Storage help</Button>
              </ToggleTip.Trigger>
              <ToggleTip.Content aria-label="Storage help">
                <ToggleTip.Body>
                  Storage is shared across your workspace.
                </ToggleTip.Body>
              </ToggleTip.Content>
            </ToggleTip.Root>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
