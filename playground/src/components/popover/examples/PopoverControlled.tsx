import { useState } from "react";
import { Button, Popover, Text } from "@flowstack-ui/brick";
export function PopoverControlled() {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Controlled
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Controlled panel</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Text>Application state owns this disclosure.</Text>
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
