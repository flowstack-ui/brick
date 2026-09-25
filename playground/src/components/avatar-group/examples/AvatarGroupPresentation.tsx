import { Avatar, AvatarGroup, HStack } from "@flowstack-ui/brick";

export function AvatarGroupPresentation() {
  return (
    <HStack gap="8" wrap="wrap">
      <AvatarGroup tone="accent" variant="solid" size="lg" radius="sm">
        <Avatar alt="Ada Lovelace" fallback="AL" />
        <Avatar alt="Grace Hopper" fallback="GH" />
        <Avatar
          alt="Katherine Johnson"
          fallback="KJ"
          tone="neutral"
          variant="subtle"
        />
      </AvatarGroup>
      <AvatarGroup borderless>
        <Avatar alt="Ada Lovelace" fallback="AL" />
        <Avatar alt="Grace Hopper" fallback="GH" tone="accent" />
        <Avatar alt="Katherine Johnson" fallback="KJ" />
      </AvatarGroup>
    </HStack>
  );
}
