import { useState } from "react";
import { Carousel, Surface, Text, VStack } from "@flowstack-ui/brick";
export function CarouselControlled() {
  const [page, setPage] = useState(0);
  const items = ["Discover", "Create", "Share"];
  return (
    <VStack gap={3}>
      <Text>Page {page + 1}</Text>
      <Carousel.Root
        aria-label="Controlled carousel"
        page={page}
        onPageChange={(details) => setPage(details.page)}
        loop={false}
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
      </Carousel.Root>
    </VStack>
  );
}
