import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { useState } from "react";
import {
  Button,
  Text,
  Tree,
  VStack,
  createTreeCollection,
  useTreeContext,
  type TreeNode,
} from "@flowstack-ui/brick";
function Status() {
  const { loadingValues, loadErrors, retryLoad } = useTreeContext();
  return (
    <VStack gap={2}>
      {loadingValues.includes("remote") ? (
        <Text role="status">Loading files…</Text>
      ) : null}
      {loadErrors.remote ? (
        <Button size="sm" variant="outline" onClick={() => retryLoad("remote")}>
          Retry loading files
        </Button>
      ) : null}
    </VStack>
  );
}
export function TreeLoading() {
  const [nodes, setNodes] = useState<readonly TreeNode[]>([
    { value: "remote", label: "Remote files", expandable: true },
  ]);
  const [failNext, setFailNext] = useState(true);
  return (
    <Tree.Root
      aria-label="Remote files"
      collection={createTreeCollection(nodes)}
      selectionMode="none"
      loadChildren={async (_value, { signal }) => {
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (signal.aborted) return;
        if (failNext) {
          setFailNext(false);
          throw new Error("Example network failure");
        }
        setNodes([
          {
            value: "remote",
            label: "Remote files",
            children: [{ value: "report", label: "Report.pdf" }],
          },
        ]);
      }}
    >
      <Tree.Item value="remote" expandable interactive>
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>Remote files</Tree.ItemText>
          <Status />
        </Tree.ItemContent>
        <Tree.Group>
          {nodes[0].children?.map((node) => (
            <Tree.Item key={node.value} value={node.value}>
              <Tree.ItemContent>
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
