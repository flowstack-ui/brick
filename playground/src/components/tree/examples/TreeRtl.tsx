import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree } from "@flowstack-ui/brick";
export function TreeRtl() {
  return (
    <Tree.Root
      dir="rtl"
      aria-label="ملفات المشروع"
      defaultExpandedValue={["src"]}
    >
      <Tree.Item value="src" expandable>
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>المصدر</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group>
          <Tree.Item value="app">
            <Tree.ItemContent>
              <TreeNodeIcon />
              <Tree.ItemText>التطبيق</Tree.ItemText>
            </Tree.ItemContent>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}
