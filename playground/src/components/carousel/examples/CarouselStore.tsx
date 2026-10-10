import {
  Carousel,
  useCarousel,
  Button,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function CarouselStore() {
  const carousel = useCarousel({ loop: false });
  const items = ["Discover", "Create", "Share"];
  return (
    <VStack gap={3} align="start">
      <Button variant="outline" onClick={() => carousel.selectPage(2)}>
        Go to Share
      </Button>
      <Carousel.RootProvider
        aria-label="Store carousel"
        value={carousel}
        controlPlacement="outside"
        tone="neutral"
      >
        <Carousel.Viewport>
          <Carousel.Track>
            {items.map((item) => (
              <Carousel.Slide key={item} value={item} label={item}>
                <Surface
                  level="subtle"
                  inset="lg"
                  style={{ height: 200, display: "grid", placeItems: "center" }}
                >
                  <Text variant="title-lg">{item}</Text>
                </Surface>
              </Carousel.Slide>
            ))}
          </Carousel.Track>
        </Carousel.Viewport>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Indicators variant="bare" />
          <Carousel.Next />
          <Carousel.ProgressText />
        </Carousel.Controls>
      </Carousel.RootProvider>
    </VStack>
  );
}
