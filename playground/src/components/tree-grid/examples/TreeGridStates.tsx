import { VStack, Text } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridStates() {
  return (
    <VStack gap={8}>
      <VStack gap={2}>
        <Text>Disabled</Text>
        <TreeGridBasic disabled />
      </VStack>
      <VStack gap={2}>
        <Text>Read-only</Text>
        <TreeGridBasic readOnly selectionMode="single" defaultValue="app" />
      </VStack>
    </VStack>
  );
}
