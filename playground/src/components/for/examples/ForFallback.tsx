import { For, Text, VStack } from "@flowstack-ui/brick";

export function ForFallback() {
  const empty: readonly string[] = [];
  const missing: readonly string[] | undefined = undefined;
  return (
    <VStack gap="3">
      <For
        each={empty}
        fallback={<Text tone="secondary">No items to show</Text>}
      >
        {(item) => <Text key={item}>{item}</Text>}
      </For>
      <For
        each={missing}
        fallback={<Text tone="secondary">No results loaded</Text>}
      >
        {(item) => <Text key={item}>{item}</Text>}
      </For>
    </VStack>
  );
}
