import {
  Carousel,
  type CarouselControlPlacement,
  type CarouselControlShape,
  type CarouselControlSize,
  type CarouselControlVariant,
  type CarouselNavigationVisibility,
  type CarouselPickerVariant,
  type CarouselRadius,
  type CarouselRootProps,
  type CarouselSize,
} from "../../../src/carousel.js";
const size: CarouselSize = "lg";
const placement: CarouselControlPlacement = "outside";
const radius: CarouselRadius = "none";
const props: CarouselRootProps = { children: null, size, controlPlacement: placement, defaultValue: "one", fill: true, radius };
const controlSize: CarouselControlSize = "xs";
const shape: CarouselControlShape = "circle";
const variant: CarouselControlVariant = "ghost";
const visibility: CarouselNavigationVisibility = "interaction";
const picker: CarouselPickerVariant = "bare";
void Carousel; void props;
void controlSize; void shape; void variant; void visibility; void picker;
// @ts-expect-error Carousel sizes are closed.
const badSize: CarouselSize = "xl";
// @ts-expect-error Placements are closed.
const badPlacement: CarouselControlPlacement = "bottom";
// @ts-expect-error Radius recipes are closed.
const badRadius: CarouselRadius = "pill";
void badSize; void badPlacement; void badRadius;
