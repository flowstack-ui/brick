import { Frame, Image } from "@flowstack-ui/brick";
export function ImageSources() {
  return (
    <Frame maxInlineSize="100%" inlineSize="min(100%, 32rem)">
      <Image.Root
        src="/assets/image/studio.webp"
        srcSet="/assets/image/studio-384.webp 384w, /assets/image/studio.webp 768w"
      >
        <Image.Content
          alt="Sunlit studio with an oak table and open sketchbooks"
          width={768}
          height={512}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 36rem) calc(100vw - 4rem), 32rem"
        />
        <Image.Fallback>Studio image unavailable</Image.Fallback>
      </Image.Root>
    </Frame>
  );
}
