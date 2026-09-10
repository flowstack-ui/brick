import { AspectRatio, Frame } from "@flowstack-ui/brick";

export function AspectRatioVideo() {
  return (
    <Frame asChild maxInlineSize={560}>
      <AspectRatio.Root ratio={1}>
        <iframe
          title="Big Buck Bunny — Blender animated short"
          src="https://www.youtube.com/embed/aqz-KE-bpKQ"
          loading="lazy"
          allowFullScreen
        />
      </AspectRatio.Root>
    </Frame>
  );
}
