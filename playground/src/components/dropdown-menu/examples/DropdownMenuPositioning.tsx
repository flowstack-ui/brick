import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuPositioning() {
  return (
    <DropdownMenu.Root positioning={{ placement: "right-start" }}>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Open beside trigger
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="edit">Edit record</DropdownMenu.Item>
        <DropdownMenu.Item value="duplicate">
          Duplicate record
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
