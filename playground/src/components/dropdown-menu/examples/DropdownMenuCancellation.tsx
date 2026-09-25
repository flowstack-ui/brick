import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuCancellation() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Selection cancellation
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          value="preview"
          onSelect={(event) => event.preventDefault()}
        >
          Preview without closing
        </DropdownMenu.Item>
        <DropdownMenu.Item value="finish">Done</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
