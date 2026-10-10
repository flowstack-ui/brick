import { Frame, Image } from "@flowstack-ui/brick";
export function ImageFit() {
  return (
    <Frame maxInlineSize="100%" inlineSize="18rem">
      <Image.Root
        src="/assets/image/studio.webp"
        ratio={1}
        fit="contain"
        frame="subtle"
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
