import { DataGrid } from "@flowstack-ui/brick";
export function DataGridRtl() {
  return (
    <DataGrid.Root
      dir="rtl"
      aria-label="المشاريع"
      rowCount={2}
      columnCount={2}
      variant="outline"
    >
      <DataGrid.Header>
        <DataGrid.Row rowIndex={1}>
          <DataGrid.ColumnHeader columnIndex={1}>المشروع</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader columnIndex={2}>الحالة</DataGrid.ColumnHeader>
        </DataGrid.Row>
      </DataGrid.Header>
      <DataGrid.Body>
        <DataGrid.Row rowIndex={2} value="website">
          <DataGrid.RowHeader columnIndex={1}>الموقع</DataGrid.RowHeader>
          <DataGrid.Cell columnIndex={2}>جاهز</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Body>
    </DataGrid.Root>
  );
}
