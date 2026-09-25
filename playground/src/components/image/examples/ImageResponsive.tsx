import { Frame, Image } from "@flowstack-ui/brick";
export function ImageResponsive() {
  return (
    <Image.Root
      src="/assets/image/studio.webp"
      fit={{ initial: "cover", md: "contain" }}
      position={{ initial: "start", lg: "30% 65%" }}
      ratio={{ md: 1, lg: 16 / 9 }}
    >
      <Image.Content
        alt="Sunlit studio with an oak table and open sketchbooks"
        width={768}
        height={512}
      />
      <Image.Fallback>Studio image unavailable</Image.Fallback>
    </Image.Root>
  );
}
