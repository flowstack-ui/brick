import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree, Text, VStack } from "@flowstack-ui/brick";
export function TreeArtwork() {
  return (
    <VStack gap={4}>
      {(
        [
          "Default indentation",
          "Guided hierarchy",
          "Unindented hierarchy",
        ] as const
      ).map((label) => (
        <VStack key={label} gap={2}>
          <Text>{label}</Text>
          <Tree.Root
            aria-label={label}
            showGuide={label === "Guided hierarchy"}
            style={
              label === "Unindented hierarchy"
                ? ({
                    "--brick-tree-depth-indent": "0px",
                  } as React.CSSProperties)
                : undefined
            }
            defaultExpandedValue={["project"]}
          >
            <Tree.Item value="project" expandable>
              <Tree.ItemContent>
                <TreeNodeIcon />
                <Tree.ItemText>Project</Tree.ItemText>
              </Tree.ItemContent>
              <Tree.Group>
                <Tree.Item value="readme">
                  <Tree.ItemContent>
                    <TreeNodeIcon />
                    <Tree.ItemText>README.md</Tree.ItemText>
                  </Tree.ItemContent>
                </Tree.Item>
              </Tree.Group>
            </Tree.Item>
          </Tree.Root>
        </VStack>
      ))}
    </VStack>
  );
}
