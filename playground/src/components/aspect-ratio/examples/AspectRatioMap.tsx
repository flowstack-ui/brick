import { AspectRatio } from "@flowstack-ui/brick";

export function AspectRatioMap() {
  return (
    <AspectRatio.Root ratio={16 / 9}>
      <iframe
        title="Map of Lagos, Nigeria"
        src="https://www.google.com/maps?q=Lagos%2C%20Nigeria&output=embed"
        loading="lazy"
        allowFullScreen
      />
    </AspectRatio.Root>
  );
}
