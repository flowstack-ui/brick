import { useRef } from "react";
import { Button, HStack, Popover } from "@flowstack-ui/brick";
export function PopoverVirtual() {
  const anchor = useRef<HTMLButtonElement>(null);
  return (
    <HStack gap="6">
      <Button ref={anchor} variant="ghost">
        Reference
      </Button>
      <Popover.Root
        positioning={{
          getAnchorRect: () => anchor.current?.getBoundingClientRect() ?? null,
        }}
      >
        <Popover.Trigger asChild>
          <Button variant="outline">Open at reference</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <Popover.Body>
              <Popover.Title>Virtual anchor</Popover.Title>
            </Popover.Body>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </HStack>
  );
}
