import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import {
  For,
  Frame,
  ScrollArea,
  Icon,
  ReorderableList,
  Text,
} from "@flowstack-ui/brick";
export function ReorderableListScroll() {
  const [items, setItems] = useState([
    "Research",
    "Design",
    "Build",
    "Review",
    "Test",
    "Deploy",
    "Monitor",
    "Improve",
  ]);
  return (
    <Frame maxInlineSize={560}>
      <Frame blockSize={240} asChild>
        <ScrollArea.Root scrollbar="custom">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <ReorderableList.Root
                items={items}
                onItemsChange={setItems}
                getItemLabel={(value) => value}
              >
                <For each={items}>
                  {(value) => (
                    <ReorderableList.Item key={value} value={value}>
                      <ReorderableList.Handle aria-label={`Reorder ${value}`}>
                        <Icon size="sm">
                          <GripVertical />
                        </Icon>
                      </ReorderableList.Handle>
                      <ReorderableList.Content>
                        <Text>{value}</Text>
                      </ReorderableList.Content>
                      <ReorderableList.Actions>
                        <ReorderableList.MoveBefore
                          aria-label={`Move ${value} earlier`}
                        >
                          <Icon size="sm">
                            <ArrowUp />
                          </Icon>
                        </ReorderableList.MoveBefore>
                        <ReorderableList.MoveAfter
                          aria-label={`Move ${value} later`}
                        >
                          <Icon size="sm">
                            <ArrowDown />
                          </Icon>
                        </ReorderableList.MoveAfter>
                      </ReorderableList.Actions>
                    </ReorderableList.Item>
                  )}
                </For>
                <ReorderableList.Preview />
              </ReorderableList.Root>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Frame>
    </Frame>
  );
}
