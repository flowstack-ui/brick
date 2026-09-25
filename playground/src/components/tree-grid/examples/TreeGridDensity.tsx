import { VStack, Text } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridDensity() {
  return (
    <VStack gap={8}>
      {(["compact", "comfortable", "spacious"] as const).map((density) => (
        <VStack key={density} gap={2}>
          <Text>{density}</Text>
          <TreeGridBasic density={density} />
        </VStack>
      ))}
    </VStack>
  );
}
