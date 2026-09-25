import { Button, Popover, Text } from "@flowstack-ui/brick";
export function PopoverSameWidth() {
  return (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Match trigger width
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Body>
            <Popover.Title>Same width</Popover.Title>
            <Text>This panel follows its trigger.</Text>
          </Popover.Body>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
