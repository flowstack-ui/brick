import { Avatar, AvatarGroup } from "@flowstack-ui/brick";

export function AvatarGroupBasic() {
  return (
    <AvatarGroup>
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Grace Hopper" fallback="GH" />
      <Avatar alt="Katherine Johnson" fallback="KJ" />
    </AvatarGroup>
  );
}
