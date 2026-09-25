import { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button, TreeGrid, VStack } from "@flowstack-ui/brick";
const estimateSize = () => 48;
const getItemKey = (index: number) =>
  index === 0 ? "reports" : `report-${index}`;
export function TreeGridWindowing() {
  const [expanded, setExpanded] = useState(["reports"]);
  const [active, setActive] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>({ rowIndex: 1, columnIndex: 1 });
  const [pending, setPending] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const count = expanded.length ? 201 : 1;
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );
  const virtual = useVirtualizer({
    getScrollElement: () => scrollElement,
    count,
    estimateSize,
    getItemKey,
    overscan: 3,
  });
  const indexes = [
    ...new Set([
      0,
      ...virtual.getVirtualItems().map((item) => item.index),
      ...(active ? [active.rowIndex - 1] : []),
      ...(pending ? [pending.rowIndex - 1] : []),
    ]),
  ]
    .filter((index) => index < count)
    .sort((a, b) => a - b);
  function reveal(index: number, columnIndex = active?.columnIndex ?? 1) {
    setPending({
      rowIndex: Math.max(1, Math.min(count, index + 1)),
      columnIndex,
    });
  }
  useEffect(() => {
    if (!pending || !scrollElement) return;
    virtual.scrollToIndex(pending.rowIndex - 1);
    const frame = requestAnimationFrame(() => {
      setActive(pending);
      setPending(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pending, scrollElement, virtual.scrollToIndex]);
  return (
    <VStack gap={4}>
      <Button
        size="sm"
        variant="outline"
        disabled={!expanded.length}
        onClick={() => reveal(100, 1)}
      >
        Reveal row 101
      </Button>
      <TreeGrid.Container
        ref={setScrollElement}
        style={{ maxHeight: 288, overflowY: "auto" }}
      >
        <TreeGrid.Root
          aria-label="Windowed report grid"
          rowCount={201}
          columnCount={2}
          activeCell={active}
          onActiveCellChange={setActive}
          expandedValue={expanded}
          onExpandedValueChange={setExpanded}
          style={{
            display: "block",
            position: "relative",
            height: virtual.getTotalSize(),
          }}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              event.nativeEvent.isComposing ||
              event.altKey
            )
              return;
            const index = (active?.rowIndex ?? 1) - 1;
            const modifier = event.ctrlKey || event.metaKey;
            const target =
              modifier && event.key === "Home"
                ? 0
                : modifier && event.key === "End"
                  ? count - 1
                  : !modifier && event.key === "ArrowDown"
                    ? index + 1
                    : !modifier && event.key === "ArrowUp"
                      ? index - 1
                      : event.key === "PageDown"
                        ? index + 10
                        : event.key === "PageUp"
                          ? index - 10
                          : null;
            if (target !== null) {
              event.preventDefault();
              reveal(target, modifier ? 1 : active?.columnIndex);
            }
          }}
        >
          <TreeGrid.Body style={{ display: "block" }}>
            {indexes.map((index) => (
              <TreeGrid.Row
                key={getItemKey(index)}
                value={getItemKey(index)}
                rowIndex={index + 1}
                parentValue={index ? "reports" : undefined}
                level={index ? 2 : 1}
                expandable={!index}
                aria-posinset={index || 1}
                aria-setsize={index ? 200 : 1}
                style={{
                  position: "absolute",
                  top: index * 48,
                  insetInline: 0,
                  height: 48,
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 8rem",
                }}
              >
                <TreeGrid.RowHeader columnIndex={1}>
                  <TreeGridFileLabel folder={!index}>
                    {index ? `Report ${index}` : "Reports"}
                  </TreeGridFileLabel>
                </TreeGrid.RowHeader>
                <TreeGrid.Cell columnIndex={2}>
                  {index ? "Document" : "Folder"}
                </TreeGrid.Cell>
              </TreeGrid.Row>
            ))}
          </TreeGrid.Body>
        </TreeGrid.Root>
      </TreeGrid.Container>
    </VStack>
  );
}
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
