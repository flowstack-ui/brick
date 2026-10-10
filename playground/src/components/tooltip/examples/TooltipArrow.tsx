import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipArrow() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          With arrow
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          Optional pointer
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
