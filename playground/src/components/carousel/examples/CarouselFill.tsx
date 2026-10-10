import { Carousel, Surface, Text } from "@flowstack-ui/brick";
export function CarouselFill() {
  const items = ["Discover", "Create", "Share"];
  return (
    <Surface level="transparent" style={{ height: 300, width: "100%" }}>
      <Carousel.Root aria-label="Fill carousel" fill controlPlacement="overlay">
        <Carousel.Viewport>
          <Carousel.Track>
            {items.map((item) => (
              <Carousel.Slide value={item} key={item}>
                <Surface
                  level="subtle"
                  style={{
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Text variant="title-lg">{item}</Text>
                </Surface>
              </Carousel.Slide>
            ))}
          </Carousel.Track>
        </Carousel.Viewport>
        <Carousel.Navigation>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Navigation>
        <Carousel.Controls>
          <Carousel.Indicators />
        </Carousel.Controls>
      </Carousel.Root>
    </Surface>
  );
}
