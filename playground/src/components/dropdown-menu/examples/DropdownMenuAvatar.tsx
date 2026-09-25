import { Avatar, DropdownMenu } from "@flowstack-ui/brick";
export function DropdownMenuAvatar() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label="Account actions">
        <Avatar alt="Jordan Lee" fallback="JL" size="sm" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Jordan Lee</DropdownMenu.Label>
        <DropdownMenu.Item value="profile">Profile</DropdownMenu.Item>
        <DropdownMenu.Item value="settings">Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item value="sign-out">Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
