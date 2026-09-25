import { Frame, Image } from "@flowstack-ui/brick";
export function ImageRatio() {
  return (
    <Image.Root src="/assets/image/studio.webp" ratio={16 / 9}>
      <Image.Content
        alt="Sunlit studio with an oak table and open sketchbooks"
        width={768}
        height={512}
      />
      <Image.Fallback>Studio image unavailable</Image.Fallback>
    </Image.Root>
  );
}
