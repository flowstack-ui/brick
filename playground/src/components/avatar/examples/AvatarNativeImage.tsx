import { Avatar } from "@flowstack-ui/brick";

export function AvatarNativeImage() {
  return (
    <Avatar.Root
      alt="Brick workspace"
      src="/assets/icon-button/brick-image.png"
      size="xl"
    >
      <Avatar.Image
        loading="lazy"
        sizes="48px"
        fetchPriority="low"
        referrerPolicy="no-referrer"
      />
      <Avatar.Fallback delayMs={150}>B</Avatar.Fallback>
    </Avatar.Root>
  );
}
