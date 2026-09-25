import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree, VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeStates() {
  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Text>Disabled</Text>
        <TreeBasic disabled />
      </VStack>
      <VStack gap={2}>
        <Text>Read-only</Text>
        <TreeBasic readOnly defaultValue="app" />
      </VStack>
      <Tree.Root aria-label="Unavailable file">
        <Tree.Item value="archive" disabled>
          <Tree.ItemContent>
            <TreeNodeIcon />
            <Tree.ItemText>Archive unavailable</Tree.ItemText>
          </Tree.ItemContent>
        </Tree.Item>
      </Tree.Root>
    </VStack>
  );
}
