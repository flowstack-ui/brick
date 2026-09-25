import { Toggle, HStack, For } from "@flowstack-ui/brick";

export function ToggleRadius() {
  return (
    <HStack gap="3">
      <For each={["none", "control", "full"] as const}>
        {(radius) => (
          <Toggle radius={radius} variant="outline">
            {radius}
          </Toggle>
        )}
      </For>
    </HStack>
  );
}
