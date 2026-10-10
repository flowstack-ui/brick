import { Frame, Image } from "@flowstack-ui/brick";
export function ImageHeight() {
  return (
    <Frame maxInlineSize="100%" blockSize="14rem" inlineSize="24rem">
      <Image.Root src="/assets/image/studio.webp" fill>
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
