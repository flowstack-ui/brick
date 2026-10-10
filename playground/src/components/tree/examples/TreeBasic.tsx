import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree, type TreeRootProps } from "@flowstack-ui/brick";

export function TreeBasic(props: TreeRootProps) {
  return (
    <Tree.Root
      aria-label="Project files"
      defaultExpandedValue={["src"]}
      {...props}
    >
      <Tree.Item value="src" expandable>
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>src</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group>
          <Tree.Item value="app">
            <Tree.ItemContent>
              <TreeNodeIcon />
              <Tree.ItemText>App.tsx</Tree.ItemText>
            </Tree.ItemContent>
          </Tree.Item>
          <Tree.Item value="styles">
            <Tree.ItemContent>
              <TreeNodeIcon />
              <Tree.ItemText>styles.css</Tree.ItemText>
            </Tree.ItemContent>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
      <Tree.Item value="readme">
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>README.md</Tree.ItemText>
        </Tree.ItemContent>
      </Tree.Item>
    </Tree.Root>
  );
}
