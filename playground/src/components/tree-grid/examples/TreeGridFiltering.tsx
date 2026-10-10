import { useState } from "react";
import {
  Input,
  TreeGrid,
  VStack,
  createTreeCollection,
} from "@flowstack-ui/brick";
const collection = createTreeCollection([
  {
    value: "src",
    label: "Source",
    children: [
      { value: "app", label: "App.tsx" },
      { value: "styles", label: "styles.css" },
    ],
  },
]);
export function TreeGridFiltering() {
  const [query, setQuery] = useState("");
  const filtered = collection.filter((node) =>
    node.label.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <VStack gap={4}>
      <Input
        aria-label="Filter hierarchical rows"
        placeholder="Filter files"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <TreeGrid.Root
        aria-label="Filtered hierarchy"
        rowCount={filtered.entries.length}
        columnCount={2}
        defaultExpandedValue={["src"]}
      >
        <TreeGrid.Body>
          {filtered.entries.map((entry, index) => (
            <TreeGrid.Row
              key={entry.value}
              value={entry.value}
              parentValue={entry.parentValue}
              level={entry.level}
              rowIndex={index + 1}
              expandable={Boolean(entry.node.children?.length)}
            >
              <TreeGrid.RowHeader columnIndex={1}>
                <TreeGridFileLabel
                  folder={Boolean(entry.node.children?.length)}
                >
                  {entry.node.label}
                </TreeGridFileLabel>
              </TreeGrid.RowHeader>
              <TreeGrid.Cell columnIndex={2}>
                {entry.node.children ? "Folder" : "File"}
              </TreeGrid.Cell>
            </TreeGrid.Row>
          ))}
        </TreeGrid.Body>
      </TreeGrid.Root>
    </VStack>
  );
}
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
