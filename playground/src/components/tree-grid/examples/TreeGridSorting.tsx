import { useMemo, useState } from "react";
import { TreeGrid } from "@flowstack-ui/brick";
import { fileRows } from "./TreeGridBasic.js";
export function TreeGridSorting() {
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "ascending",
  );
  const rows = useMemo(() => {
    const visit = (parent?: string): typeof fileRows =>
      fileRows
        .filter((row) => row.parent === parent)
        .sort(
          (a, b) =>
            (direction === "ascending" ? 1 : -1) *
            a.label.localeCompare(b.label),
        )
        .flatMap((row) => [row, ...visit(row.value)]);
    return visit();
  }, [direction]);
  return (
    <TreeGrid.Container>
      <TreeGrid.Root
        aria-label="Sorted files"
        columnCount={2}
        rowCount={5}
        defaultExpandedValue={["src"]}
      >
        <TreeGrid.Header>
          <TreeGrid.Row value="head" rowIndex={1} selectable={false}>
            <TreeGrid.ColumnHeader
              columnIndex={1}
              sortDirection={direction}
              onAction={() =>
                setDirection((value) =>
                  value === "ascending" ? "descending" : "ascending",
                )
              }
            >
              Name
              <TreeGrid.SortIndicator />
            </TreeGrid.ColumnHeader>
            <TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader>
          </TreeGrid.Row>
        </TreeGrid.Header>
        <TreeGrid.Body>
          {rows.map((row, index) => (
            <TreeGrid.Row
              key={row.value}
              value={row.value}
              rowIndex={index + 2}
              parentValue={row.parent}
              level={row.level}
              expandable={row.expandable}
            >
              <TreeGrid.RowHeader columnIndex={1}>
                <TreeGridFileLabel folder={row.expandable}>
                  {row.label}
                </TreeGridFileLabel>
              </TreeGrid.RowHeader>
              <TreeGrid.Cell columnIndex={2}>{row.type}</TreeGrid.Cell>
            </TreeGrid.Row>
          ))}
        </TreeGrid.Body>
      </TreeGrid.Root>
    </TreeGrid.Container>
  );
}
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
