import { useState } from "react";
import { ArrowRight, ArrowLeft, GripVertical } from "lucide-react";
import { For, Frame, Icon, ReorderableList, Text } from "@flowstack-ui/brick";
export function ReorderableListMixed() {
  const [items, setItems] = useState([
    "Blue",
    "Orange",
    "Yellow",
    "Peach",
    "Charcoal",
    "Light blue",
  ]);
  return (
    <Frame maxInlineSize={900}>
      <ReorderableList.Root
        layout="grid"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}
        items={items}
        onItemsChange={setItems}
        getItemLabel={(value) => value}
      >
        <For each={items}>
          {(value) => (
            <ReorderableList.Item
              key={value}
              value={value}
              style={{
                width: value === "Orange" ? 320 : 240,
                maxWidth: "100%",
              }}
            >
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
              <ReorderableList.DropIndicator />
            </ReorderableList.Item>
          )}
        </For>
        <ReorderableList.Preview />
      </ReorderableList.Root>
    </Frame>
  );
}
