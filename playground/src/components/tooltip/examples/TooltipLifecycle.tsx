import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipLifecycle() {
  return (
    <Tooltip.Root
      lazyMount={false}
      unmountOnExit={false}
      immediate
      skipAnimationOnMount
    >
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Retained content
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          Mounted while closed, but hidden and inaccessible.
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
