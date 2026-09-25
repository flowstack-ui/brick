import { Divider, For, Text, VStack } from "@flowstack-ui/brick";

export function DividerInset() {
  return (
    <VStack gap="6">
      <For each={["none", "start", "both"] as const}>
        {(inset) => (
          <VStack key={inset} gap="3">
            <Text>{inset}</Text>
            <Divider inset={inset} />
          </VStack>
        )}
      </For>
    </VStack>
  );
}
