import { Button, DropdownMenu, Tooltip } from "@flowstack-ui/brick";
export function TooltipMenu() {
  return (
    <DropdownMenu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" tone="neutral">
              Actions
            </Button>
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Available project actions</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <Tooltip.Root positioning={{ placement: "right" }}>
            <Tooltip.Trigger asChild>
              <DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content>Create a copy of this project</Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <DropdownMenu.Item value="archive">Archive</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
