import { Divider, For, Text, VStack } from "@flowstack-ui/brick";

export function DividerVariants() {
  return (
    <VStack gap="6">
      <For each={["solid", "dashed", "dotted"] as const}>
        {(variant) => (
          <VStack key={variant} gap="3">
            <Text>{variant}</Text>
            <Divider variant={variant} />
          </VStack>
        )}
      </For>
    </VStack>
  );
}
