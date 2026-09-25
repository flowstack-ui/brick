import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { Tree } from "@flowstack-ui/brick";
export function TreeAnimation() {
  return (
    <Tree.Root aria-label="Animated folders" selectionMode="none">
      <Tree.Item value="folder" expandable>
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>Components</Tree.ItemText>
        </Tree.ItemContent>
        <Tree.Group animate>
          {["Button", "Input", "Tree"].map((name) => (
            <Tree.Item key={name} value={name}>
              <Tree.ItemContent>
                <TreeNodeIcon />
                <Tree.ItemText>{name}</Tree.ItemText>
              </Tree.ItemContent>
            </Tree.Item>
          ))}
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}
