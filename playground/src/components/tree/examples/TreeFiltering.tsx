import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { useMemo, useState } from "react";
import {
  Button,
  HStack,
  Input,
  Tree,
  VStack,
  createTreeCollection,
  type TreeNode,
} from "@flowstack-ui/brick";
const initial = [
  {
    value: "src",
    label: "Source",
    children: [
      { value: "app", label: "App.tsx" },
      { value: "styles", label: "styles.css" },
    ],
  },
];
function Nodes({ nodes }: { nodes: readonly TreeNode[] }) {
  return (
    <>
      {nodes.map((node) => (
        <Tree.Item
          key={node.value}
          value={node.value}
          expandable={Boolean(node.children?.length)}
        >
          <Tree.ItemContent>
            <TreeNodeIcon />
            <Tree.ItemText>{node.label}</Tree.ItemText>
          </Tree.ItemContent>
          {node.children?.length ? (
            <Tree.Group>
              <Nodes nodes={node.children} />
            </Tree.Group>
          ) : null}
        </Tree.Item>
      ))}
    </>
  );
}
export function TreeFiltering() {
  const [collection, setCollection] = useState(() =>
    createTreeCollection(initial),
  );
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      collection.filter((node) =>
        node.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [collection, query],
  );
  return (
    <VStack gap={4}>
      <Input
        aria-label="Filter files"
        placeholder="Filter files"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setCollection((current) =>
              current.update("app", (node) => ({ ...node, label: "Main.tsx" })),
            )
          }
        >
          Rename App
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCollection((current) => current.remove("styles"))}
        >
          Remove styles
        </Button>
      </HStack>
      <Tree.Root
        aria-label="Filtered files"
        collection={filtered}
        defaultExpandedValue={["src"]}
      >
        <Nodes nodes={filtered.nodes} />
      </Tree.Root>
    </VStack>
  );
}
