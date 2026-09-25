import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree, createTreeCollection } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";
const collection = createTreeCollection([
  {
    value: "project",
    label: "Project",
    children: [
      { value: "app", label: "App.tsx" },
      { value: "styles", label: "styles.css" },
    ],
  },
]);
export function TreeChecking() {
  return (
    <Tree.Root
      aria-label="Files to include"
      collection={collection}
      checkable
      checkPropagation="descendants"
      selectionMode="none"
      expandOnClick={false}
      style={
        {
          "--brick-tree-depth-indent":
            "calc(var(--brick-tree-trigger-size) + var(--brick-tree-row-gap))",
        } as CSSProperties
      }
      defaultCheckedValue={["app"]}
      defaultExpandedValue={["project"]}
    >
      <Tree.Item value="project" expandable>
        <Tree.ItemContent>
          <Tree.Trigger />
          <Tree.Checkbox aria-label="Include project" />
          <TreeNodeIcon />
          <Tree.ItemText>Project</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group>
          {collection.nodes[0].children?.map((node) => (
            <Tree.Item key={node.value} value={node.value}>
              <Tree.ItemContent>
                <Tree.Checkbox aria-label={`Include ${node.label}`} />
                <TreeNodeIcon />
                <Tree.ItemText>{node.label}</Tree.ItemText>
              </Tree.ItemContent>
            </Tree.Item>
          ))}
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}
