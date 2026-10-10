import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuDanger() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          File actions
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="rename">Rename file</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item value="delete" tone="danger">
          Delete file
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
