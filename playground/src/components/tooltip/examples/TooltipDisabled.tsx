import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipDisabled() {
  return (
    <Tooltip.Root disabled>
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Tooltip disabled
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>This hint will not open</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
