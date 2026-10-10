import { Button, For, HStack, Tooltip } from "@flowstack-ui/brick";
export function TooltipPlacement() {
  return (
    <HStack wrap="wrap" gap="4">
      <For each={["top", "right", "bottom", "left"] as const}>
        {(placement) => (
          <Tooltip.Root key={placement} positioning={{ placement }}>
            <Tooltip.Trigger asChild>
              <Button variant="outline" tone="neutral">
                {placement}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content>
                {placement}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </For>
    </HStack>
  );
}
