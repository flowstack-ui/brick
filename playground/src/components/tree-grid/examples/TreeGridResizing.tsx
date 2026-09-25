import { useState } from "react";
import { TreeGrid } from "@flowstack-ui/brick";
export function TreeGridResizing() {
  const [width, setWidth] = useState(240);
  return (
    <TreeGrid.Container>
      <TreeGrid.Root
        aria-label="Resizable files"
        rowCount={2}
        columnCount={2}
        layout="fixed"
        minInlineSize={480}
      >
        <TreeGrid.ColumnGroup>
          <TreeGrid.Column htmlWidth={width} />
          <TreeGrid.Column />
        </TreeGrid.ColumnGroup>
        <TreeGrid.Header>
          <TreeGrid.Row value="head" rowIndex={1} selectable={false}>
            <TreeGrid.ColumnHeader columnIndex={1} interactive>
              Name
              <TreeGrid.ColumnResizeHandle
                aria-label="Resize name column"
                value={width}
                min={120}
                max={360}
                onValueChange={setWidth}
              />
            </TreeGrid.ColumnHeader>
            <TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader>
          </TreeGrid.Row>
        </TreeGrid.Header>
        <TreeGrid.Body>
          <TreeGrid.Row value="readme" rowIndex={2}>
            <TreeGrid.RowHeader columnIndex={1}>README.md</TreeGrid.RowHeader>
            <TreeGrid.Cell columnIndex={2}>Markdown</TreeGrid.Cell>
          </TreeGrid.Row>
        </TreeGrid.Body>
      </TreeGrid.Root>
    </TreeGrid.Container>
  );
}
