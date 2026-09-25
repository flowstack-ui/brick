import { Button, For, HStack, Tooltip } from "@flowstack-ui/brick";
export function TooltipShared() {
  return (
    <Tooltip.Root openDelay={100}>
      <HStack gap="4">
        <For each={["Projects", "Members", "Settings"]}>
          {(value) => (
            <Tooltip.Trigger key={value} value={value} asChild>
              <Button variant="outline" tone="neutral">
                {value}
              </Button>
            </Tooltip.Trigger>
          )}
        </For>
      </HStack>
      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Context>
            {({ triggerValue }) => "Open " + (triggerValue ?? "section")}
          </Tooltip.Context>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
