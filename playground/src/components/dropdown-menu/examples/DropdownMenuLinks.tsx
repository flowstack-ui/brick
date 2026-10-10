import { DropdownMenu, Button, Link } from "@flowstack-ui/brick";
export function DropdownMenuLinks() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Actions
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item asChild value="guide">
          <Link
            variant="plain"
            href="https://github.com/flowstack-ui/brick"
            target="_blank"
            rel="noreferrer"
          >
            Source repository
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild value="help">
          <Link
            variant="plain"
            href="https://github.com/flowstack-ui/brick/issues"
            target="_blank"
            rel="noreferrer"
          >
            Report a problem
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
