import { TreeGrid } from "@flowstack-ui/brick";
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
export function TreeGridRtl() {
  return (
    <TreeGrid.Root
      dir="rtl"
      aria-label="ملفات المشروع"
      defaultExpandedValue={["src"]}
      rowCount={2}
      columnCount={2}
    >
      <TreeGrid.Body>
        <TreeGrid.Row value="src" rowIndex={1} expandable>
          <TreeGrid.RowHeader columnIndex={1}>
            <TreeGridFileLabel folder>المصدر</TreeGridFileLabel>
          </TreeGrid.RowHeader>
          <TreeGrid.Cell columnIndex={2}>مجلد</TreeGrid.Cell>
        </TreeGrid.Row>
        <TreeGrid.Row value="app" parentValue="src" level={2} rowIndex={2}>
          <TreeGrid.RowHeader columnIndex={1}>
            <TreeGridFileLabel>التطبيق</TreeGridFileLabel>
          </TreeGrid.RowHeader>
          <TreeGrid.Cell columnIndex={2}>ملف</TreeGrid.Cell>
        </TreeGrid.Row>
      </TreeGrid.Body>
    </TreeGrid.Root>
  );
}
