import { Button, Input, Popover } from "@flowstack-ui/brick";
export function PopoverModal() {
  return (
    <Popover.Root modal>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Modal settings
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Modal settings</Popover.Title>
            <Popover.Description>
              Tab stays in this panel while it is open.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <Input aria-label="Workspace name" placeholder="Workspace" />
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button>Done</Button>
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
