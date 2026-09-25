import { Button, Carousel, Surface, Text } from "@flowstack-ui/brick";
export function CarouselArrows() {
  const items = ["Discover", "Create", "Collaborate", "Share", "Explore"];
  return (
    <Carousel.Root
      aria-label="Arrows carousel"
      loop={false}
      controlPlacement="outside"
      tone="neutral"
      controlVariant="outline"
      controlShape="rounded"
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
        <Carousel.Previous asChild unstyled>
          <Button variant="outline" tone="neutral">
            Previous
          </Button>
        </Carousel.Previous>
        <Carousel.Indicators variant="bare" />
        <Carousel.Next asChild unstyled>
          <Button variant="outline" tone="neutral">
            Next
          </Button>
        </Carousel.Next>
        <Carousel.ProgressText />
      </Carousel.Controls>
    </Carousel.Root>
  );
}
