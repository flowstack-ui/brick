import { Button, CloseButton, Dialog, Tooltip } from "@flowstack-ui/brick";
export function TooltipDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Open dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project settings</Dialog.Title>
            <Dialog.Description>
              Tooltip remains above its parent overlay.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button variant="outline" tone="neutral">
                  Project visibility
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content>
                  Visible to workspace members
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
