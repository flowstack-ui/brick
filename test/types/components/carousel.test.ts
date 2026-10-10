import {
  Carousel,
  useCarousel,
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
const multiPage: CarouselRootProps = {page:0, slidesPerPage:2, slidesPerMove:2, spacing:4, padding:"2rem", orientation:"vertical", size:{md:"lg"}, tone:"neutral"};
// @ts-expect-error Do not run two selection controllers.
const competing: CarouselRootProps = {page:0,value:"one"};
void multiPage; void competing;
function ControllerContract() {
  const controller = useCarousel({ slideCount: 3 });
  controller.selectPage(1);
  // @ts-expect-error Internal DOM registration is not an application controller API.
  controller.registerSlide;
  // @ts-expect-error Internal scroll transport is not an application controller API.
  controller.writeOffset;
  return controller;
}
void ControllerContract;
