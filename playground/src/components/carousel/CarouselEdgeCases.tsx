import { useState } from "react";
import {
  Button,
  Carousel,
  HStack,
  Surface,
  VStack,
  useCarousel,
} from "@flowstack-ui/brick";

/** Deliberately adversarial fixtures, kept off the normal feature documentation. */
export function CarouselEdgeCases() {
  const [page, setPage] = useState(0);
  const [accept, setAccept] = useState(false);
  const api = useCarousel({
    page,
    onPageChange: (detail) => {
      if (accept) setPage(detail.page);
    },
    loop: false,
  });
  const content = (values: string[]) => (
    <Carousel.Viewport>
      <Carousel.Track>
        {values.map((value) => (
          <Carousel.Slide key={value} value={value}>
            <Surface level="subtle" inset="md" style={{ height: 180 }}>
              {value}
              <input
                aria-label={`${value} retained input`}
                defaultValue={value}
              />
            </Surface>
          </Carousel.Slide>
        ))}
      </Carousel.Track>
    </Carousel.Viewport>
  );
  return (
    <VStack gap={6}>
      <HStack gap={3}>
        <Button onClick={() => setAccept((v) => !v)}>
          Accept requests: {String(accept)}
        </Button>
        <Button onClick={() => setPage(2)}>External last page</Button>
      </HStack>
      <Carousel.RootProvider
        value={api}
        aria-label="Controlled rejection fixture"
        controlPlacement="outside"
      >
        {content(["one", "two", "three"])}
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
          <Carousel.ProgressText />
        </Carousel.Controls>
      </Carousel.RootProvider>
      <Carousel.Root
        aria-label="Short loop fixture"
        slidesPerPage={1.5}
        loop
        controlPlacement="outside"
      >
        {content(["short-one", "short-two"])}
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel.Root>
      <Carousel.Root
        aria-label="No overflow fixture"
        slidesPerPage={2}
        loop
        defaultAutoPlay
        controlPlacement="outside"
      >
        <Carousel.RotationControl />
        {content(["fits-one", "fits-two"])}
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel.Root>
    </VStack>
  );
}
