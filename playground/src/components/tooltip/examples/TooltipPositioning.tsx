import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipPositioning() {
  return (
    <Tooltip.Root
      positioning={{
        placement: "bottom",
        strategy: "fixed",
        sameWidth: true,
        fitViewport: true,
        hideWhenDetached: true,
        overflowPadding: 12,
      }}
    >
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Fixed, matching width
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>Constrained to available space.</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
