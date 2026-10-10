import { TreeGrid, type TreeGridRootProps } from "@flowstack-ui/brick";
export const fileRows = [
  {
    value: "src",
    label: "src",
    level: 1,
    parent: undefined,
    expandable: true,
    type: "Folder",
  },
  {
    value: "app",
    label: "App.tsx",
    level: 2,
    parent: "src",
    expandable: false,
    type: "TypeScript",
  },
  {
    value: "styles",
    label: "styles.css",
    level: 2,
    parent: "src",
    expandable: false,
    type: "CSS",
  },
  {
    value: "readme",
    label: "README.md",
    level: 1,
    parent: undefined,
    expandable: false,
    type: "Markdown",
  },
];
export function TreeGridBasic(props: TreeGridRootProps) {
  return (
    <TreeGrid.Container>
      <TreeGrid.Root
        aria-label="Project files"
        rowCount={5}
        columnCount={2}
        defaultExpandedValue={["src"]}
        {...props}
      >
        <TreeGrid.Header>
          <TreeGrid.Row value="header" rowIndex={1} selectable={false}>
            <TreeGrid.ColumnHeader columnIndex={1}>Name</TreeGrid.ColumnHeader>
            <TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader>
          </TreeGrid.Row>
        </TreeGrid.Header>
        <TreeGrid.Body>
          {fileRows.map((row, index) => (
            <TreeGrid.Row
              key={row.value}
              value={row.value}
              rowIndex={index + 2}
              parentValue={row.parent}
              level={row.level}
              expandable={row.expandable}
            >
              <TreeGrid.RowHeader columnIndex={1}>
                <TreeGridFileLabel folder={row.expandable}>
                  {row.label}
                </TreeGridFileLabel>
              </TreeGrid.RowHeader>
              <TreeGrid.Cell columnIndex={2}>{row.type}</TreeGrid.Cell>
            </TreeGrid.Row>
          ))}
        </TreeGrid.Body>
      </TreeGrid.Root>
    </TreeGrid.Container>
  );
}
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
