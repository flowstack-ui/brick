import { Divider, For, Text, VStack } from "@flowstack-ui/brick";

export function DividerThickness() {
  return (
    <VStack gap="6">
      <For each={["hairline", "subtle", "regular", "bold", "strong"] as const}>
        {(thickness) => (
          <VStack key={thickness} gap="3">
            <Text>{thickness}</Text>
            <Divider thickness={thickness} />
          </VStack>
        )}
      </For>
    </VStack>
  );
}
