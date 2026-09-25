import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipInteractive() {
  return (
    <Tooltip.Root interactive>
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Hover retention
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          Move the pointer here; this remains a non-interactive hint.
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
