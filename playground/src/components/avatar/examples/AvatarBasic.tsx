import { Avatar, HStack } from "@flowstack-ui/brick";

export function AvatarBasic() {
  return (
    <HStack gap="4">
      <Avatar
        alt="Brick workspace"
        src="/assets/icon-button/brick-image.png"
        fallback="B"
      />
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Unassigned participant" />
    </HStack>
  );
}
