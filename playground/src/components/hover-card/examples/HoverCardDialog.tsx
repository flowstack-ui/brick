import {
  Button,
  CloseButton,
  Dialog,
  HoverCard,
  Link,
} from "@flowstack-ui/brick";
export function HoverCardDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Collaborators</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HoverCard.Root
                positioning={{ strategy: "fixed", hideWhenDetached: true }}
              >
                <HoverCard.Trigger asChild>
                  <Link href="/hover-card/destination?resource=dialog">
                    Ada's profile
                  </Link>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content>
                    A supplementary preview inside the dialog.
                    <HoverCard.Arrow />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </Dialog.Body>
            <Dialog.Close placement="corner" asChild>
              <CloseButton />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
