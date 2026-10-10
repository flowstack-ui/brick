import { Avatar, Frame } from "@flowstack-ui/brick";

export function AvatarFull() {
  return (
    <Frame inlineSize="6rem" blockSize="6rem">
      <Avatar
        alt="Brick workspace"
        src="/assets/icon-button/brick-image.png"
        fallback="B"
        size="full"
      />
    </Frame>
  );
}
