import { TreeGrid } from "@flowstack-ui/brick";
export function TreeGridSticky() {
  return (
    <TreeGrid.Container style={{ maxHeight: 260 }}>
      <TreeGrid.Root
        aria-label="Pinned file names"
        stickyHeader
        minInlineSize={720}
        rowCount={21}
        columnCount={2}
        surface="base"
      >
        <TreeGrid.Header>
          <TreeGrid.Row value="head" rowIndex={1} selectable={false}>
            <TreeGrid.ColumnHeader columnIndex={1} sticky="start">
              Name
            </TreeGrid.ColumnHeader>
            <TreeGrid.ColumnHeader columnIndex={2}>
              Description
            </TreeGrid.ColumnHeader>
          </TreeGrid.Row>
        </TreeGrid.Header>
        <TreeGrid.Body>
          {Array.from({ length: 20 }, (_, index) => (
            <TreeGrid.Row
              key={index}
              value={`file-${index}`}
              rowIndex={index + 2}
            >
              <TreeGrid.RowHeader columnIndex={1} sticky="start">
                File {index + 1}
              </TreeGrid.RowHeader>
              <TreeGrid.Cell columnIndex={2}>
                A detailed project document description
              </TreeGrid.Cell>
            </TreeGrid.Row>
          ))}
        </TreeGrid.Body>
      </TreeGrid.Root>
    </TreeGrid.Container>
  );
}
