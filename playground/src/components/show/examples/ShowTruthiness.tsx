import { Show, Text, VStack } from "@flowstack-ui/brick";
export function ShowTruthiness() {
  const count = 0;
  const items: string[] = [];
  return (
    <VStack gap="3">
      <Show when={count} fallback={<Text>Zero is falsy</Text>}>
        <Text>Nonzero</Text>
      </Show>
      <Show when={items.length > 0} fallback={<Text>No items</Text>}>
        <Text>Items available</Text>
      </Show>
    </VStack>
  );
}
