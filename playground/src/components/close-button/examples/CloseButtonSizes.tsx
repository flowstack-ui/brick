import { CloseButton, For, HStack } from "@flowstack-ui/brick";

export function CloseButtonSizes() {
  return (
    <HStack gap="3" wrap>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <CloseButton size={size} aria-label={`Action ${size}`}></CloseButton>
        )}
      </For>
    </HStack>
  );
}
