import { DataGrid } from "@flowstack-ui/brick";
export function DataGridSticky() {
  return (
    <DataGrid.Container style={{ maxBlockSize: 260 }}>
      <DataGrid.Root
        aria-label="Milestones"
        rowCount={21}
        columnCount={3}
        stickyHeader
        minInlineSize={700}
        surface="base"
        variant="outline"
      >
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1} sticky="start">
              Milestone
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2}>
              Description
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={3}>Owner</DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {Array.from({ length: 20 }, (_, i) => (
            <DataGrid.Row key={i} value={`milestone-${i}`} rowIndex={i + 2}>
              <DataGrid.RowHeader columnIndex={1} sticky="start">
                Milestone {i + 1}
              </DataGrid.RowHeader>
              <DataGrid.Cell columnIndex={2}>
                Review and delivery checkpoint
              </DataGrid.Cell>
              <DataGrid.Cell columnIndex={3}>Design team</DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </DataGrid.Root>
    </DataGrid.Container>
  );
}
