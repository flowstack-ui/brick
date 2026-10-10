import { TreeGrid } from "@flowstack-ui/brick";
export function TreeGridDisclosure() {
  return (
    <TreeGrid.Root
      aria-label="Independent disclosure"
      columnCount={2}
      rowCount={2}
      selectionMode="single"
      selectOnRowClick
    >
      <TreeGrid.Body>
        <TreeGrid.Row value="folder" rowIndex={1} expandable>
          <TreeGrid.RowHeader columnIndex={1} expandOnClick={false}>
            <TreeGrid.Trigger aria-label="Toggle project" />
            Project
          </TreeGrid.RowHeader>
          <TreeGrid.Cell columnIndex={2}>Folder</TreeGrid.Cell>
        </TreeGrid.Row>
        <TreeGrid.Row value="file" parentValue="folder" level={2} rowIndex={2}>
          <TreeGrid.RowHeader columnIndex={1}>README.md</TreeGrid.RowHeader>
          <TreeGrid.Cell columnIndex={2}>Markdown</TreeGrid.Cell>
        </TreeGrid.Row>
      </TreeGrid.Body>
    </TreeGrid.Root>
  );
}
