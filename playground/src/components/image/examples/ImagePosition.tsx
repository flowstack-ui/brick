import { Frame, Image } from "@flowstack-ui/brick";
export function ImagePosition() {
  return (
    <Frame maxInlineSize="100%" inlineSize="20rem">
      <Image.Root src="/assets/image/studio.webp" ratio={1} position="30% 65%">
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
