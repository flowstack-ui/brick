import { Button, HStack, Popover, usePopover } from "@flowstack-ui/brick";
export function PopoverStore() {
  const controller = usePopover();
  return (
    <Popover.RootProvider value={controller}>
      <HStack gap="3">
        <Button onClick={() => controller.setOpen(!controller.open)}>
          Toggle externally
        </Button>
        <Popover.Trigger asChild>
          <Button variant="outline">Anchor trigger</Button>
        </Popover.Trigger>
      </HStack>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Body>
            <Popover.Title>External controller</Popover.Title>
          </Popover.Body>
          <Popover.Footer>
            <Button onClick={() => controller.setOpen(false)}>Done</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.RootProvider>
  );
}
