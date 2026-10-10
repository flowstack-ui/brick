import { VStack } from "@flowstack-ui/brick";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { treeGridExamples, treeGridParts } from "./documentation.js";
import { TreeGridBasic } from "./examples/TreeGridBasic.js";
import source from "./examples/TreeGridBasic.tsx?raw";
export function TreeGridDocumentation() {
  return <VStack gap={12} data-component-page="tree-grid">
    <ExamplePreview label="Tree Grid basic" source={source}><TreeGridBasic /></ExamplePreview>
    <OwnerDocumentation name="TreeGrid" usageDescription="Use TreeGrid for hierarchical rows with two-dimensional keyboard navigation. Use Tree for one primary column."
      usage={'<TreeGrid.Root aria-label="Files" rowCount={1} columnCount={1}>\n  <TreeGrid.Body><TreeGrid.Row value="readme" rowIndex={1}>\n    <TreeGrid.RowHeader columnIndex={1}>README.md</TreeGrid.RowHeader>\n  </TreeGrid.Row></TreeGrid.Body>\n</TreeGrid.Root>'}
      examples={treeGridExamples} parts={treeGridParts} />
  </VStack>;
}
