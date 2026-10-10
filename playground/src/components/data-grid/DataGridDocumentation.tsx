import { VStack } from "@flowstack-ui/brick";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { dataGridExamples, dataGridParts } from "./documentation.js";
import { DataGridBasic } from "./examples/DataGridBasic.js";
import source from "./examples/DataGridBasic.tsx?raw";
export function DataGridDocumentation() {
  return <VStack gap={12} data-component-page="data-grid">
    <ExamplePreview label="Data Grid basic" source={source}><DataGridBasic /></ExamplePreview>
    <OwnerDocumentation name="DataGrid" usageDescription="Use DataGrid for two-dimensional cell navigation. Use Table for native tabular reading and independently tabbable controls."
      usage={'<DataGrid.Root aria-label="Projects" rowCount={2} columnCount={1}>\n  <DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header>\n  <DataGrid.Body><DataGrid.Row rowIndex={2} value="website"><DataGrid.RowHeader columnIndex={1}>Website</DataGrid.RowHeader></DataGrid.Row></DataGrid.Body>\n</DataGrid.Root>'}
      examples={dataGridExamples} parts={dataGridParts} />
  </VStack>;
}
