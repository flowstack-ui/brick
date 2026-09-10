import { AspectRatio, Frame, Image } from "@flowstack-ui/brick";

export function AspectRatioImage() {
  return (
    <Frame asChild maxInlineSize={400}>
      <AspectRatio.Root ratio={4 / 3}>
        <Image.Root fill src="/assets/image/studio.webp">
          <Image.Content alt="Sunlit studio with a wooden table, books, and a leafy plant" />
        </Image.Root>
      </AspectRatio.Root>
    </Frame>
  );
}
