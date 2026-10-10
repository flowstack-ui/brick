import { useState } from "react";
import { ArrowRight, ArrowLeft, GripVertical } from "lucide-react";
import { For, Frame, Icon, ReorderableList, Text } from "@flowstack-ui/brick";
export function ReorderableListHorizontal() {
  const [items, setItems] = useState(["Research", "Design", "Build"]);
  return (
    <Frame maxInlineSize={560}>
      <ReorderableList.Root
        orientation="horizontal"
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
                    <ArrowLeft />
                  </Icon>
                </ReorderableList.MoveBefore>
                <ReorderableList.MoveAfter aria-label={`Move ${value} later`}>
                  <Icon size="sm">
                    <ArrowRight />
                  </Icon>
                </ReorderableList.MoveAfter>
              </ReorderableList.Actions>
            </ReorderableList.Item>
          )}
        </For>
        <ReorderableList.Preview />
      </ReorderableList.Root>
    </Frame>
  );
}
