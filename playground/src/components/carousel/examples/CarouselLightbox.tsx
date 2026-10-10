import {
  Carousel,
  Image,
  Card,
  Button,
  Dialog,
  CloseButton,
} from "@flowstack-ui/brick";
export function CarouselLightbox() {
  const items = [
    { name: "Creative studio", src: "/assets/image/studio.webp" },
    {
      name: "Mountain retreat",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    },
    {
      name: "Coastal escape",
      src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop",
    },
  ];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">View product images</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Product images</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Carousel.Root
                aria-label="Lightbox carousel"
                loop={false}
                controlPlacement="outside"
                tone="neutral"
              >
                <Carousel.Viewport>
                  <Carousel.Track>
                    {items.map((item) => (
                      <Carousel.Slide
                        key={item.name}
                        value={item.name}
                        label={item.name}
                      >
                        <Image.Root src={item.src}>
                          <Image.Content
                            alt={item.name}
                            style={{
                              height: 280,
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Image.Fallback>Image unavailable</Image.Fallback>
                        </Image.Root>
                      </Carousel.Slide>
                    ))}
                  </Carousel.Track>
                </Carousel.Viewport>
                <Carousel.Controls>
                  <Carousel.Previous />
                  <Carousel.Indicators variant="bare" />
                  <Carousel.Next />
                </Carousel.Controls>
              </Carousel.Root>
            </Dialog.Body>
            <Dialog.Close placement="corner" asChild>
              <CloseButton size="sm" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
