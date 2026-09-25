import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeSizes() {
  return (
    <VStack gap={6}>
      {(["xs", "sm", "md"] as const).map((size) => (
        <VStack key={size} gap={2}>
          <Text>{size}</Text>
          <TreeBasic size={size} density="compact" />
        </VStack>
      ))}
    </VStack>
  );
}
