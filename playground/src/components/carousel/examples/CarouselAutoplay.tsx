import { Carousel, Surface, Text, VStack } from "@flowstack-ui/brick";
export function CarouselAutoplay() {
  const items = ["Discover", "Create", "Collaborate", "Share", "Explore"];
  return (
    <Carousel.Root
      aria-label="Autoplay carousel"
      controlPlacement="outside"
      tone="neutral"
      defaultAutoPlay
      interval={4000}
      loop
    >
      <Carousel.Controls>
        <Carousel.RotationControl />
        <Carousel.Previous />
        <Carousel.Indicators variant="bare" />
        <Carousel.Next />
      </Carousel.Controls>
      <Carousel.Viewport>
        <Carousel.Track>
          {items.map((item, index) => (
            <Carousel.Slide key={item} value={item} label={item}>
              <Surface
                level="subtle"
                inset="lg"
                radius="sm"
                style={{ height: 200, display: "grid", placeItems: "center" }}
              >
                <Text variant="title-lg">{item}</Text>
              </Surface>
            </Carousel.Slide>
          ))}
        </Carousel.Track>
      </Carousel.Viewport>
    </Carousel.Root>
  );
}
