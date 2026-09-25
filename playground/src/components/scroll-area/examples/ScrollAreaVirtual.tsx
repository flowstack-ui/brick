import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { For, Frame, ScrollArea, Text, VStack } from "@flowstack-ui/brick";

export function ScrollAreaVirtual() {
  const viewport = useRef<HTMLDivElement>(null);
  const virtual = useVirtualizer({
    count: 10000,
    getScrollElement: () => viewport.current,
    estimateSize: () => 40,
    overscan: 5,
    useFlushSync: false,
  });
  const rows = virtual.getVirtualItems();
  return (
    <Frame blockSize="16rem" asChild>
      <ScrollArea.Root scrollbar="custom" scrollbarVisibility="always">
        <ScrollArea.Viewport
          focusable
          aria-label="Virtual project archive"
          ref={viewport}
        >
          <ScrollArea.Content>
            <Frame blockSize={virtual.getTotalSize()}>
              {/* This transform is virtualizer geometry, not a layout recipe. */}
              <VStack
                role="list"
                gap="0"
                style={{ transform: `translateY(${rows[0]?.start ?? 0}px)` }}
              >
                <For each={rows}>
                  {(row) => (
                    <Frame key={row.key} blockSize={row.size} asChild>
                      <Text
                        role="listitem"
                        aria-posinset={row.index + 1}
                        aria-setsize={10000}
                      >
                        Project record {row.index + 1}
                      </Text>
                    </Frame>
                  )}
                </For>
              </VStack>
            </Frame>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Frame>
  );
}
