import { Avatar, AvatarGroup, DropdownMenu } from "@flowstack-ui/brick";

export function AvatarGroupMenu() {
  return (
    <AvatarGroup
      max={3}
      total={4}
      renderOverflow={(count) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger aria-label={`Show ${count} more collaborators`}>
            <Avatar alt="" fallback={`+${count}`} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>More collaborators</DropdownMenu.Label>
            <DropdownMenu.Item value="katherine">
              Katherine Johnson
            </DropdownMenu.Item>
            <DropdownMenu.Item value="margaret">
              Margaret Hamilton
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    >
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Grace Hopper" fallback="GH" />
    </AvatarGroup>
  );
}
