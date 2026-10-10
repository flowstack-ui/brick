import { VStack, Text } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridSizes() {
  return (
    <VStack gap={8}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <VStack key={size} gap={2}>
          <Text>{size}</Text>
          <TreeGridBasic size={size} />
        </VStack>
      ))}
    </VStack>
  );
}
