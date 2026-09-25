import { Button, Popover, Tooltip } from "@flowstack-ui/brick";
export function TooltipPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Open popover
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Sharing</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button variant="outline" tone="neutral">
                  Copy share link
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content>
                  Anyone with this link can view.
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Popover.Body>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
