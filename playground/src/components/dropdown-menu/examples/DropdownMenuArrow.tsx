import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuArrow() {
  return (
    <DropdownMenu.Root positioning={{ placement: "bottom" }}>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Actions with arrow
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Arrow />
        <DropdownMenu.Item value="edit">Edit record</DropdownMenu.Item>
        <DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
