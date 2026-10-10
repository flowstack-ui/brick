import { Frame, Image } from "@flowstack-ui/brick";
export function ImageFrame() {
  return (
    <Frame maxInlineSize="100%" inlineSize="22rem">
      <Image.Root
        src="/assets/image/studio.webp"
        ratio={4 / 3}
        frame="subtle"
        radius="lg"
      >
        <Image.Content
          alt="Sunlit studio with an oak table and open sketchbooks"
          width={768}
          height={512}
        />
        <Image.Fallback>Studio image unavailable</Image.Fallback>
      </Image.Root>
    </Frame>
  );
}
