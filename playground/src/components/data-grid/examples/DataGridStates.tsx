import { DataGrid, Text, VStack } from "@flowstack-ui/brick";
export function DataGridStates() {
  return (
    <VStack gap={4}>
      <DataGrid.Root
        aria-label="Project availability"
        rowCount={4}
        columnCount={2}
        selectionMode="multiple"
        readOnly
        value={["ready"]}
      >
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1}>
              Project
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2}>
              Availability
            </DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          <DataGrid.Row rowIndex={2} value="ready" selectable>
            <DataGrid.RowHeader columnIndex={1}>Website</DataGrid.RowHeader>
            <DataGrid.Cell columnIndex={2}>Selected, read-only</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row rowIndex={3} value="archived" disabled>
            <DataGrid.RowHeader columnIndex={1}>Legacy app</DataGrid.RowHeader>
            <DataGrid.Cell columnIndex={2}>Disabled row</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row rowIndex={4} value="draft">
            <DataGrid.RowHeader columnIndex={1}>New app</DataGrid.RowHeader>
            <DataGrid.Cell columnIndex={2} disabled>
              Restricted cell
            </DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Body>
      </DataGrid.Root>
      <Text variant="body-sm">
        Read-only preserves navigation. Disabled rows and cells are skipped.
      </Text>
    </VStack>
  );
}
