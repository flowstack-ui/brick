import {
  Button,
  Frame,
  Grid,
  HStack,
  Marquee,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
function GalleryLane({ reverse = false }: { reverse?: boolean }) {
  const value = useMarquee({ autoFill: true, side: "top", reverse, speed: 25 });
  // Native passive images keep replicas free from loading-state effects.
  const artwork = () =>
    [
      "/assets/image/studio.webp",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop",
    ].map((file) => (
      <Marquee.Item key={file}>
        <img
          src={file}
          width={240}
          height={150}
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
      </Marquee.Item>
    ));
  return (
    <VStack gap={3}>
      <HStack gap={2} justify="end">
        <Button
          size="xs"
          variant="outline"
          tone="neutral"
          onClick={value.togglePause}
        >
          {value.requestedPaused ? "Resume" : "Pause"}{" "}
          {reverse ? "right" : "left"} gallery
        </Button>
      </HStack>
      <Frame blockSize="20rem">
        <Marquee.RootProvider
          value={value}
          aria-label={reverse ? "Right studio gallery" : "Left studio gallery"}
        >
          <Marquee.Viewport>
            <Marquee.Content renderReplica={artwork}>
              {artwork()}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.RootProvider>
      </Frame>
    </VStack>
  );
}
export function MarqueeGallery() {
  return (
    <Grid.Root columns={2} gap={4}>
      <GalleryLane />
      <GalleryLane reverse />
    </Grid.Root>
  );
}
