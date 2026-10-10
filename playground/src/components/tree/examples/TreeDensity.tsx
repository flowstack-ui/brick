import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeDensity() {
  return (
    <VStack gap={6}>
      {(["compact", "comfortable"] as const).map((density) => (
        <VStack key={density} gap={2}>
          <Text>{density}</Text>
          <TreeBasic density={density} />
        </VStack>
      ))}
    </VStack>
  );
}
