import { ContextMenu, Surface, Link } from "@flowstack-ui/brick";
export function ContextMenuLinks() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions: right-click or press Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item asChild value="guide">
          <Link
            variant="plain"
            tone="inherit"
            href="https://github.com/flowstack-ui/brick"
            target="_blank"
            rel="noreferrer"
          >
            Source repository
          </Link>
        </ContextMenu.Item>
        <ContextMenu.Item asChild tone="danger" value="help">
          <Link
            variant="plain"
            tone="inherit"
            href="https://github.com/flowstack-ui/brick/issues"
            target="_blank"
            rel="noreferrer"
          >
            Report a problem
          </Link>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
