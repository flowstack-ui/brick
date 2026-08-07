import { Carousel, type CarouselControlPlacement, type CarouselRootProps, type CarouselSize } from "../../../src/carousel.js";
const size: CarouselSize = "lg";
const placement: CarouselControlPlacement = "outside";
const props: CarouselRootProps = { children: null, size, controlPlacement: placement, defaultValue: "one" };
void Carousel; void props;
// @ts-expect-error Carousel sizes are closed.
const badSize: CarouselSize = "xl";
// @ts-expect-error Placements are closed.
const badPlacement: CarouselControlPlacement = "bottom";
void badSize; void badPlacement;
