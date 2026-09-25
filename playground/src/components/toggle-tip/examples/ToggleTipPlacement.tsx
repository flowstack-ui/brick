import { Button, ToggleTip, HStack, For } from "@flowstack-ui/brick";

export function ToggleTipPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["top", "right", "bottom", "left"] as const}>
        {(placement) => (
          <ToggleTip.Root
            key={placement}
            positioning={{ placement, gutter: 8 }}
          >
            <ToggleTip.Trigger asChild>
              <Button variant="outline">{placement}</Button>
            </ToggleTip.Trigger>
            <ToggleTip.Portal>
              <ToggleTip.Content aria-label={placement}>
                <ToggleTip.Body>
                  Preferred placement: {placement}
                </ToggleTip.Body>
                <ToggleTip.Arrow />
              </ToggleTip.Content>
            </ToggleTip.Portal>
          </ToggleTip.Root>
        )}
      </For>
    </HStack>
  );
}
