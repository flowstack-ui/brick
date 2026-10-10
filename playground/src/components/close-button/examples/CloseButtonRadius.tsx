import { CloseButton, For, HStack } from "@flowstack-ui/brick";

export function CloseButtonRadius() {
  return (
    <HStack gap="3" wrap>
      <For each={["none", "sm", "control", "full"] as const}>
        {(radius) => (
          <CloseButton
            variant="outline"
            radius={radius}
            aria-label={`Action ${radius}`}
          ></CloseButton>
        )}
      </For>
    </HStack>
  );
}
