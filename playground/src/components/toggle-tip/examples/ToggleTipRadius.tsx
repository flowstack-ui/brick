import { Button, ToggleTip, HStack, For } from "@flowstack-ui/brick";

export function ToggleTipRadius() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["none", "sm", "overlay"] as const}>
        {(radius) => (
          <ToggleTip.Root key={radius}>
            <ToggleTip.Trigger asChild>
              <Button variant="outline">{radius}</Button>
            </ToggleTip.Trigger>
            <ToggleTip.Portal>
              <ToggleTip.Content radius={radius} aria-label={radius}>
                <ToggleTip.Body>Radius: {radius}</ToggleTip.Body>
              </ToggleTip.Content>
            </ToggleTip.Portal>
          </ToggleTip.Root>
        )}
      </For>
    </HStack>
  );
}
