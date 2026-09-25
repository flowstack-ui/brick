import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import {
  Button,
  VStack,
  For,
  Frame,
  Icon,
  ReorderableList,
  Text,
} from "@flowstack-ui/brick";
export function ReorderableListRecovery() {
  const [items, setItems] = useState(["Research", "Design", "Build"]);
  const [previous, setPrevious] = useState(items);
  return (
    <Frame maxInlineSize={560}>
      <VStack gap={4}>
        <ReorderableList.Root
          items={items}
          onItemsChange={(next) => {
            setPrevious(items);
            setItems(next);
          }}
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
          <ReorderableList.Preview />
        </ReorderableList.Root>
        <Button variant="outline" size="sm" onClick={() => setItems(previous)}>
          Undo last move
        </Button>
      </VStack>
    </Frame>
  );
}
