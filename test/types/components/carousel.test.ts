import {
  Carousel,
  type CarouselControlPlacement,
  type CarouselControlShape,
  type CarouselControlSize,
  type CarouselControlVariant,
  type CarouselNavigationVisibility,
  type CarouselPickerVariant,
  type CarouselRootProps,
  type CarouselSize,
} from "../../../src/carousel.js";
const size: CarouselSize = "lg";
const placement: CarouselControlPlacement = "outside";
const props: CarouselRootProps = { children: null, size, controlPlacement: placement, defaultValue: "one", fill: true };
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
void badSize; void badPlacement;
