import { VStack, Text } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridVariants() {
  return (
    <VStack gap={8}>
      {(["line", "outline"] as const).map((variant) => (
        <VStack key={variant} gap={2}>
          <Text>{variant}</Text>
          <TreeGridBasic variant={variant} striped showColumnBorder />
        </VStack>
      ))}
    </VStack>
  );
}
