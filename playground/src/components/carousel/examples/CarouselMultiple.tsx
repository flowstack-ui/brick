import { Carousel, Surface, Text, VStack } from "@flowstack-ui/brick";
export function CarouselMultiple() {
  const items = ["Discover", "Create", "Collaborate", "Share", "Explore"];
  return (
    <Carousel.Root
      aria-label="Multiple carousel"
      loop={false}
      controlPlacement="outside"
      tone="neutral"
      slidesPerPage={2}
      slidesPerMove={2}
      spacing={4}
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
      <Carousel.Controls>
        <Carousel.Previous />
        <Carousel.Indicators variant="bare" />
        <Carousel.Next />
        <Carousel.ProgressText />
      </Carousel.Controls>
    </Carousel.Root>
  );
}
