import {
  ContextMenu,
  For,
  HStack,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";
export function ContextMenuMultiple() {
  return (
    <ContextMenu.Root>
      <VStack gap="4">
        <HStack gap="4" wrap="wrap">
          <For each={["Draft", "Published"]}>
            {(value) => (
              <ContextMenu.Trigger key={value} value={value} asChild>
                <Surface bordered inset="lg" radius="sm" tabIndex={0}>
                  {value}: right-click or Shift+F10
                </Surface>
              </ContextMenu.Trigger>
            )}
          </For>
        </HStack>
        <ContextMenu.Context>
          {({ triggerValue }) => (
            <Paragraph tone="secondary">
              Last target: {triggerValue ?? "none"}
            </Paragraph>
          )}
        </ContextMenu.Context>
      </VStack>
      <ContextMenu.Content>
        <ContextMenu.Item value="inspect">Inspect target</ContextMenu.Item>
        <ContextMenu.Item value="copy">Copy target</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
