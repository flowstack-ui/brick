import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Button,
  Tree,
  VStack,
  createTreeCollection,
} from "@flowstack-ui/brick";
const children = Array.from({ length: 200 }, (_, index) => ({
  value: `file-${index}`,
  label: `Report ${index + 1}`,
}));
const collection = createTreeCollection([
  { value: "reports", label: "Reports", children },
]);
const estimateSize = () => 44;
const getItemKey = (index: number) => children[index].value;

export function TreeWindowing() {
  const [focused, setFocused] = useState<string | null>("reports");
  const [expanded, setExpanded] = useState(["reports"]);
  const [pending, setPending] = useState<number | null>(null);
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );
  const virtual = useVirtualizer({
    getScrollElement: () => scrollElement,
    count: expanded.length ? children.length : 0,
    estimateSize,
    getItemKey,
    overscan: 3,
  });
  const activeIndex = children.findIndex((node) => node.value === focused);
  const indexes = [
    ...new Set([
      ...virtual.getVirtualItems().map((item) => item.index),
      ...(activeIndex >= 0 ? [activeIndex] : []),
      ...(pending === null ? [] : [pending]),
    ]),
  ].sort((a, b) => a - b);
  function reveal(index: number) {
    if (index < 0) {
      setFocused("reports");
      return;
    }
    const target = Math.min(children.length - 1, index);
    setPending(target);
    setExpanded(["reports"]);
  }
  useEffect(() => {
    if (pending === null || !scrollElement) return;
    virtual.scrollToIndex(pending);
    const frame = requestAnimationFrame(() => {
      setFocused(children[pending].value);
      setPending(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pending, scrollElement, virtual.scrollToIndex]);
  return (
    <VStack gap={4}>
      <Button size="sm" variant="outline" onClick={() => reveal(99)}>
        Reveal report 100
      </Button>
      <Tree.Root
        aria-label="Windowed reports"
        collection={collection}
        expandedValue={expanded}
        onExpandedValueChange={setExpanded}
        focusedValue={focused}
        onFocusedValueChange={setFocused}
        selectionMode="single"
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            event.nativeEvent.isComposing ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            !expanded.length
          )
            return;
          const target =
            event.key === "Home"
              ? -1
              : event.key === "End"
                ? children.length - 1
                : event.key === "ArrowDown"
                  ? activeIndex + 1
                  : event.key === "ArrowUp"
                    ? activeIndex - 1
                    : null;
          if (target !== null) {
            event.preventDefault();
            reveal(target);
          }
        }}
      >
        <Tree.Item
          value="reports"
          expandable
          aria-posinset={1}
          aria-setsize={1}
        >
          <Tree.ItemContent>
            <TreeNodeIcon />
            <Tree.ItemText>Reports</Tree.ItemText>
          </Tree.ItemContent>
          <Tree.Group
            ref={setScrollElement}
            style={{ blockSize: 264, overflowY: "auto" }}
          >
            <div
              role="presentation"
              style={{ position: "relative", height: virtual.getTotalSize() }}
            >
              {indexes.map((index) => (
                <Tree.Item
                  key={children[index].value}
                  value={children[index].value}
                  aria-posinset={index + 1}
                  aria-setsize={children.length}
                  style={{
                    position: "absolute",
                    top: index * 44,
                    insetInline: 0,
                  }}
                >
                  <Tree.ItemContent>
                    <TreeNodeIcon />
                    <Tree.ItemText>{children[index].label}</Tree.ItemText>
                  </Tree.ItemContent>
                </Tree.Item>
              ))}
            </div>
          </Tree.Group>
        </Tree.Item>
      </Tree.Root>
    </VStack>
  );
}
