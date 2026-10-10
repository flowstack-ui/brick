import { Button, Popover, Text } from "@flowstack-ui/brick";
export function PopoverOffset() {
  return (
    <Popover.Root positioning={{ offset: { mainAxis: 16, crossAxis: 12 } }}>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Custom offset
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Body>
            <Popover.Title>Offset panel</Popover.Title>
            <Text>Distance and cross-axis adjustment are independent.</Text>
          </Popover.Body>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
