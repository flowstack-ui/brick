import { Button, Input, Popover } from "@flowstack-ui/brick";
export function PopoverLazy() {
  return (
    <Popover.Root lazyMount unmountOnExit={false}>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Lazy mount
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Remember your changes</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Input
              aria-label="Draft name"
              placeholder="Type, close and reopen"
            />
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button variant="outline">Close</Button>
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
