import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";
export function TreeDisclosure() {
  return (
    <Tree.Root
      aria-label="Disclosure-only files"
      selectionMode="none"
      expandOnClick={false}
      style={
        {
          "--brick-tree-depth-indent":
            "calc(var(--brick-tree-trigger-size) + var(--brick-tree-row-gap))",
        } as CSSProperties
      }
    >
      <Tree.Item value="folder" expandable>
        <Tree.ItemContent>
          <Tree.Trigger aria-label="Toggle project folder" />
          <TreeNodeIcon />
          <Tree.ItemText>Project</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group>
          <Tree.Item value="file">
            <Tree.ItemContent>
              <TreeNodeIcon />
              <Tree.ItemText>README.md</Tree.ItemText>
            </Tree.ItemContent>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}
