import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipDelay() {
  return (
    <Tooltip.Provider openDelay={500} closeDelay={100} skipDelay={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline" tone="neutral">
            500ms open / 100ms close
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>A deliberate delay</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
