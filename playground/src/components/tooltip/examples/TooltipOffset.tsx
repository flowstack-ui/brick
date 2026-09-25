import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipOffset() {
  return (
    <Tooltip.Root
      positioning={{
        placement: "top-start",
        offset: { mainAxis: 16, crossAxis: 12 },
      }}
    >
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Offset
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          16px away, 12px across
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
