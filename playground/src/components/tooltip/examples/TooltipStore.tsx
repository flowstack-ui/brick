import { Button, HStack, Tooltip, useTooltip } from "@flowstack-ui/brick";
export function TooltipStore() {
  const tooltip = useTooltip({
    closeOnClick: false,
    closeOnPointerDown: false,
  });
  return (
    <HStack gap="4">
      <Button
        variant="outline"
        tone="neutral"
        onClick={() => tooltip.setOpen(!tooltip.open)}
      >
        Toggle store
      </Button>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Store target
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>One shared controller</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.RootProvider>
    </HStack>
  );
}
