import { ContextMenu, Surface, For } from "@flowstack-ui/brick";
export function ContextMenuOverflow() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions: right-click or press Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <For each={Array.from({ length: 30 }, (_, i) => i + 1)}>
          {(index) => (
            <ContextMenu.Item key={index} value={String(index)}>
              Workspace {index}
            </ContextMenu.Item>
          )}
        </For>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
