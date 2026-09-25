import { Fragment, useRef, useState } from "react";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";
import { DataGrid } from "@flowstack-ui/brick";

// Optional application dependency; keep the active row mounted even offscreen.
export function DataGridVirtual() {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const activeIndex = active && active.rowIndex > 1 ? active.rowIndex - 2 : -1;
  const virtual = useVirtualizer({
    count: 1000,
    getScrollElement: () => viewport.current,
    estimateSize: () => 48,
    overscan: 4,
    paddingStart: 48,
    rangeExtractor: (range) =>
      [
        ...new Set([
          ...defaultRangeExtractor(range),
          ...(activeIndex >= 0 ? [activeIndex] : []),
        ]),
      ].sort((a, b) => a - b),
  });
  const items = virtual.getVirtualItems();
  return (
    <DataGrid.Container ref={viewport} style={{ maxBlockSize: 300 }}>
      <DataGrid.Root
        aria-label="Virtual project archive"
        rowCount={1001}
        columnCount={2}
        stickyHeader
        layout="fixed"
        activeCell={active}
        onActiveCellChange={setActive}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget || !active) return;
          let row = active.rowIndex;
          let column = active.columnIndex;
          if (event.key === "ArrowDown") row++;
          else if (event.key === "ArrowUp") row--;
          else if (event.key === "PageDown") row += 10;
          else if (event.key === "PageUp") row -= 10;
          else if ((event.ctrlKey || event.metaKey) && event.key === "Home") {
            row = 1;
            column = 1;
          } else if ((event.ctrlKey || event.metaKey) && event.key === "End") {
            row = 1001;
            column = 2;
          } else return;
          event.preventDefault();
          row = Math.max(1, Math.min(1001, row));
          setActive({ rowIndex: row, columnIndex: column });
          if (row === 1) viewport.current?.scrollTo({ top: 0 });
          else virtual.scrollToIndex(row - 2, { align: "auto" });
        }}
      >
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1}>
              Project
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2} numeric>
              Record
            </DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {items.map((item, index) => {
            const gap = item.start - (items[index - 1]?.end ?? 48);
            return (
              <Fragment key={item.key}>
                {gap > 0 && (
                  <tr aria-hidden="true" role="presentation">
                    <td
                      colSpan={2}
                      style={{ height: gap, padding: 0, border: 0 }}
                    />
                  </tr>
                )}
                <DataGrid.Row
                  rowIndex={item.index + 2}
                  value={`project-${item.index}`}
                >
                  <DataGrid.RowHeader columnIndex={1}>
                    Project {item.index + 1}
                  </DataGrid.RowHeader>
                  <DataGrid.Cell columnIndex={2} numeric>
                    {item.index + 1}
                  </DataGrid.Cell>
                </DataGrid.Row>
              </Fragment>
            );
          })}
          <tr aria-hidden="true" role="presentation">
            <td
              colSpan={2}
              style={{
                height: Math.max(
                  0,
                  virtual.getTotalSize() - (items[items.length - 1]?.end ?? 48),
                ),
                padding: 0,
                border: 0,
              }}
            />
          </tr>
        </DataGrid.Body>
      </DataGrid.Root>
    </DataGrid.Container>
  );
}
