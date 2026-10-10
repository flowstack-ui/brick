import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipRich() {
  return (
    <Tooltip.Root variant="rich" interactive>
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Rich hint
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Title>Workspace access</Tooltip.Title>
          <Tooltip.Description>
            Members can view shared projects.
          </Tooltip.Description>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
