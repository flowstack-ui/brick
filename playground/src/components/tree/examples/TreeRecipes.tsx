import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeRecipes() {
  return (
    <VStack gap={6}>
      {(["subtle", "solid"] as const).map((selectionVariant) => (
        <VStack key={selectionVariant} gap={2}>
          <Text>{selectionVariant}</Text>
          <TreeBasic
            tone="accent"
            selectionVariant={selectionVariant}
            defaultValue="app"
          />
        </VStack>
      ))}
    </VStack>
  );
}
