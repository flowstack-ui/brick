import { Carousel, Surface, Text, VStack } from "@flowstack-ui/brick";
export function CarouselInteraction() {
  const items = ["Discover", "Create", "Collaborate", "Share", "Explore"];
  return (
    <Carousel.Root
      aria-label="Interaction carousel"
      loop={false}
      tone="neutral"
      controlPlacement="overlay"
      controlVariant="solid"
    >
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
      <Carousel.Navigation visibility="interaction">
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Navigation>
      <Carousel.Controls>
        <Carousel.Indicators />
      </Carousel.Controls>
    </Carousel.Root>
  );
}
