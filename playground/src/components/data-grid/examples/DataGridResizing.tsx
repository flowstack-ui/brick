import { useState } from "react";
import { DataGrid } from "@flowstack-ui/brick";
import { projects } from "./DataGridBasic.js";

export function DataGridResizing() {
  const [width, setWidth] = useState(240);
  return (
    <DataGrid.Container>
      <DataGrid.Root
        aria-label="Resizable projects"
        rowCount={4}
        columnCount={2}
        layout="fixed"
        minInlineSize={500}
        variant="outline"
      >
        <DataGrid.ColumnGroup>
          <DataGrid.Column htmlWidth={width} />
          <DataGrid.Column />
        </DataGrid.ColumnGroup>
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1} interactive>
              Project
              <DataGrid.ColumnResizeHandle
                aria-label="Project column width"
                value={width}
                min={140}
                max={360}
                onValueChange={setWidth}
              />
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2}>Owner</DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {projects.map((project, index) => (
            <DataGrid.Row
              key={project.id}
              value={project.id}
              rowIndex={index + 2}
            >
              <DataGrid.RowHeader columnIndex={1}>
                {project.name}
              </DataGrid.RowHeader>
              <DataGrid.Cell columnIndex={2}>{project.owner}</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </DataGrid.Root>
    </DataGrid.Container>
  );
}
