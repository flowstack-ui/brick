import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import {
  For,
  Frame,
  Icon,
  ReorderableList,
  Text,
  HStack,
} from "@flowstack-ui/brick";
export function ReorderableListPreview() {
  const [items, setItems] = useState(["Research", "Design", "Build"]);
  return (
    <Frame maxInlineSize={560}>
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
                <ReorderableList.MoveAfter aria-label={`Move ${value} later`}>
                  <Icon size="sm">
                    <ArrowDown />
                  </Icon>
                </ReorderableList.MoveAfter>
              </ReorderableList.Actions>
            </ReorderableList.Item>
          )}
        </For>
        <ReorderableList.Preview>
          {(value) => (
            <HStack gap={3}>
              <Icon size="sm">
                <GripVertical />
              </Icon>
              <Text weight="semibold">{value}</Text>
            </HStack>
          )}
        </ReorderableList.Preview>
      </ReorderableList.Root>
    </Frame>
  );
}
