import { Button, Input, Popover } from "@flowstack-ui/brick";
export function PopoverBasic() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Open settings
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Project settings</Popover.Title>
            <Popover.Description>
              Update the name shown to your team.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <Input aria-label="Project name" placeholder="Project name" />
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button size="sm">Save</Button>
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
