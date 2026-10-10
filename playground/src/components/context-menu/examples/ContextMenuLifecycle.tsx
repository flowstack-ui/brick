import { useState } from "react";
import { ContextMenu, Paragraph, Surface, VStack } from "@flowstack-ui/brick";
export function ContextMenuLifecycle() {
  const [exits, setExits] = useState(0);
  return (
    <VStack gap="4">
      <ContextMenu.Root
        lazyMount={false}
        unmountOnExit={false}
        onExitComplete={() => setExits((count) => count + 1)}
      >
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Retained commands: right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item value="finish">Finish and close</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Paragraph tone="secondary" role="status">
        Completed exits: {exits}
      </Paragraph>
    </VStack>
  );
}
