import { useState } from "react";
import {
  Carousel,
  Button,
  HStack,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function CarouselDynamic() {
  const [items, setItems] = useState(["Discover", "Create", "Share"]);
  return (
    <VStack gap={3}>
      <HStack gap={3}>
        <Button
          variant="outline"
          onClick={() =>
            setItems((current) => [...current, "Story " + (current.length + 1)])
          }
        >
          Add slide
        </Button>
        <Button
          variant="ghost"
          disabled={items.length < 2}
          onClick={() => setItems((current) => current.slice(0, -1))}
        >
          Remove last
        </Button>
      </HStack>
      <Carousel.Root
        aria-label="Dynamic loop carousel"
        loop
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
