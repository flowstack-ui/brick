import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  Frame,
  Icon,
  ReorderableList,
  Text,
} from "@flowstack-ui/brick";
export function ReorderableListDialog() {
  const [items, setItems] = useState(["Research", "Design", "Build"]);
  const [previewContainer, setPreviewContainer] =
    useState<HTMLDivElement | null>(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Arrange milestones</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner ref={setPreviewContainer}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Milestones</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
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
                  <ReorderableList.Preview container={previewContainer} />
                </ReorderableList.Root>
              </Frame>
            </Dialog.Body>
            <Dialog.Close placement="corner" asChild>
              <CloseButton />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
