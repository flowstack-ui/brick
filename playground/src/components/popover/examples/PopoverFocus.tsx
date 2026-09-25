import { useRef } from "react";
import { Button, Input, Popover, VStack } from "@flowstack-ui/brick";
export function PopoverFocus() {
  const preferred = useRef<HTMLInputElement>(null);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Choose initial focus</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content initialFocus={preferred} inset="md">
          <Popover.Header>
            <Popover.Title>Edit your profile</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <VStack gap="3">
              <Input aria-label="Name" placeholder="Name" />
              <Input
                ref={preferred}
                aria-label="Email"
                placeholder="Email receives focus"
              />
            </VStack>
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button>Done</Button>
            </Popover.Close>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
