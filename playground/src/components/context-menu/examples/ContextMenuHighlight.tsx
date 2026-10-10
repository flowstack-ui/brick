import { useState } from "react";
import {
  ContextMenu,
  Paragraph,
  Surface,
  VStack,
  type ContextMenuRootProps,
} from "@flowstack-ui/brick";
export function ContextMenuHighlight() {
  const [highlighted, setHighlighted] =
    useState<ContextMenuRootProps["highlightedValue"]>(null);
  return (
    <VStack gap="4">
      <ContextMenu.Root
        highlightedValue={highlighted}
        onHighlightChange={({ highlightedValue }) =>
          setHighlighted(highlightedValue)
        }
      >
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Highlight commands: right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item value="edit">Edit record</ContextMenu.Item>
          <ContextMenu.Item value="duplicate">
            Duplicate record
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Paragraph tone="secondary" role="status">
        Highlighted: {typeof highlighted === "string" ? highlighted : "none"}
      </Paragraph>
    </VStack>
  );
}
