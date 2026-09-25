import { Button, Popover, Text } from "@flowstack-ui/brick";
export function PopoverDismissal() {
  return (
    <Popover.Root closeOnInteractOutside={false} closeOnEscape={false}>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Explicit dismissal
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Explicit close</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Text>Outside interaction does not dismiss this panel.</Text>
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button>Close panel</Button>
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
