import {
  Button,
  ContextMenu,
  HStack,
  Surface,
  useContextMenu,
} from "@flowstack-ui/brick";
export function ContextMenuStore() {
  const menu = useContextMenu({
    positioning: { strategy: "fixed", hideWhenDetached: true },
  });
  return (
    <ContextMenu.RootProvider value={menu}>
      <HStack gap="4" wrap="wrap">
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Trigger value="actions" asChild>
          <Button
            variant="outline"
            tone="neutral"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              menu.setAnchorPoint({ x: rect.left, y: rect.bottom });
              menu.setTriggerValue("actions");
              menu.setOpen(true);
            }}
          >
            Actions
          </Button>
        </ContextMenu.Trigger>
      </HStack>
      <ContextMenu.Content>
        <ContextMenu.Item value="inspect">Inspect target</ContextMenu.Item>
        <ContextMenu.Item value="copy">Copy target</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.RootProvider>
  );
}
