import { Frame, Image } from "@flowstack-ui/brick";
export function ImagePicture() {
  return (
    <Image.Root asChild src="/assets/image/studio.webp" ratio={3 / 2}>
      <picture>
        <source
          media="(max-width: 40rem)"
          srcSet="/assets/image/studio-384.webp"
        />
        <Image.Content
          alt="Sunlit studio with an oak table and open sketchbooks"
          width={768}
          height={512}
        />
        <Image.Fallback asChild>
          <span>Studio image unavailable</span>
        </Image.Fallback>
      </picture>
    </Image.Root>
  );
}
