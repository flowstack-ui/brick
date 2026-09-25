import { Avatar, AvatarGroup } from "@flowstack-ui/brick";

export function AvatarGroupOverflow() {
  return (
    <AvatarGroup
      max={3}
      total={12}
      overflowLabel={(count) => `${count} more collaborators`}
    >
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Grace Hopper" fallback="GH" />
      <Avatar alt="Katherine Johnson" fallback="KJ" />
    </AvatarGroup>
  );
}
