import { useRef } from "react";
import { Button, HStack, Popover } from "@flowstack-ui/brick";

export function PopoverFocusReturn() {
  const destination = useRef<HTMLButtonElement>(null);
  return (
    <HStack gap="3">
      <Button ref={destination} variant="ghost">
        Return here
      </Button>
      <Popover.Root persistentElements={[() => destination.current]}>
        <Popover.Trigger asChild>
          <Button variant="outline">Custom focus return</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content finalFocus={destination}>
            <Popover.Body>
              <Popover.Title>Explicit destination</Popover.Title>
              <Popover.Description>
                The outside Return here control does not dismiss this panel.
              </Popover.Description>
            </Popover.Body>
            <Popover.Footer>
              <Popover.Close asChild>
                <Button>Finish and return</Button>
              </Popover.Close>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </HStack>
  );
}
