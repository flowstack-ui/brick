import { Toggle, HStack, For } from "@flowstack-ui/brick";

export function ToggleSizes() {
  return (
    <HStack gap="3" wrap>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => <Toggle size={size}>{size}</Toggle>}
      </For>
    </HStack>
  );
}
