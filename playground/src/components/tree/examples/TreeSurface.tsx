import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeSurface() {
  return (
    <VStack gap={6}>
      {(["plain", "soft", "outline"] as const).map((variant) => (
        <VStack key={variant} gap={2}>
          <Text>{variant}</Text>
          <TreeBasic variant={variant} />
        </VStack>
      ))}
    </VStack>
  );
}
