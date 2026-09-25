import { Button, Popover } from "@flowstack-ui/brick";
export function PopoverNested() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open parent</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Parent panel</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button variant="outline">Open nested panel</Button>
              </Popover.Trigger>
              <Popover.Content inset="md">
                <Popover.Body>
                  <Popover.Title>Nested panel</Popover.Title>
                </Popover.Body>
                <Popover.Footer>
                  <Popover.Close asChild>
                    <Button>Close nested</Button>
                  </Popover.Close>
                </Popover.Footer>
                <Popover.Arrow />
              </Popover.Content>
            </Popover.Root>
          </Popover.Body>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
