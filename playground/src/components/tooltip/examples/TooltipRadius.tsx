import { Button, For, HStack, Tooltip } from "@flowstack-ui/brick";
export function TooltipRadius() {
  return (
    <HStack gap="4">
      <For each={["none", "control", "full"] as const}>
        {(radius) => (
          <Tooltip.Root key={radius}>
            <Tooltip.Trigger asChild>
              <Button variant="outline" tone="neutral">
                {radius}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content radius={radius}>{radius}</Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </For>
    </HStack>
  );
}
