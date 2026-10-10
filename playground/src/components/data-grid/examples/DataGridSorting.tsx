import { useState } from "react";
import { DataGrid } from "@flowstack-ui/brick";
import { projects } from "./DataGridBasic.js";

export function DataGridSorting() {
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "ascending",
  );
  const sorted = [...projects].sort(
    (a, b) => (a.hours - b.hours) * (direction === "ascending" ? 1 : -1),
  );
  return (
    <DataGrid.Root
      aria-label="Sorted project estimates"
      rowCount={4}
      columnCount={2}
    >
      <DataGrid.Header>
        <DataGrid.Row rowIndex={1}>
          <DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader
            columnIndex={2}
            numeric
            sortDirection={direction}
            onAction={() =>
              setDirection(
                direction === "ascending" ? "descending" : "ascending",
              )
            }
          >
            Hours
            <DataGrid.SortIndicator />
          </DataGrid.ColumnHeader>
        </DataGrid.Row>
      </DataGrid.Header>
      <DataGrid.Body>
        {sorted.map((project, index) => (
          <DataGrid.Row
            key={project.id}
            value={project.id}
            rowIndex={index + 2}
          >
            <DataGrid.RowHeader columnIndex={1}>
              {project.name}
            </DataGrid.RowHeader>
            <DataGrid.Cell columnIndex={2} numeric>
              {project.hours}
            </DataGrid.Cell>
          </DataGrid.Row>
        ))}
      </DataGrid.Body>
    </DataGrid.Root>
  );
}
