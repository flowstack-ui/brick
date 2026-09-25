import { TreeNodeIcon } from "../TreeNodeIcon.js";
import {
  Button,
  HStack,
  VStack,
  Tree,
  createTreeCollection,
  useTreeController,
} from "@flowstack-ui/brick";
const collection = createTreeCollection([
  {
    value: "project",
    label: "Project",
    children: [{ value: "readme", label: "README.md" }],
  },
]);
export function TreeController() {
  const api = useTreeController({ collection });
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button size="sm" variant="outline" onClick={api.expandAll}>
          Expand all
        </Button>
        <Button size="sm" variant="outline" onClick={api.collapseAll}>
          Collapse all
        </Button>
      </HStack>
      <Tree.RootProvider value={api} aria-label="Controlled project">
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
      </Tree.RootProvider>
    </VStack>
  );
}
