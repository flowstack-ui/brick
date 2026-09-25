import { Button, ToggleTip, HStack, For } from "@flowstack-ui/brick";

export function ToggleTipSizes() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <ToggleTip.Root key={size}>
            <ToggleTip.Trigger asChild>
              <Button size={size} variant="outline">
                {size}
              </Button>
            </ToggleTip.Trigger>
            <ToggleTip.Portal>
              <ToggleTip.Content size={size} aria-label={size}>
                <ToggleTip.Body>
                  {size}: Storage is shared across your workspace.
                </ToggleTip.Body>
              </ToggleTip.Content>
            </ToggleTip.Portal>
          </ToggleTip.Root>
        )}
      </For>
    </HStack>
  );
}
