"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEventHandler,
} from "react";
import {
  Carousel as AtomCarousel,
  type CarouselNextProps as AtomCarouselNextProps,
  type CarouselPickerItemProps as AtomCarouselPickerItemProps,
  type CarouselPickerProps as AtomCarouselPickerProps,
  type CarouselPreviousProps as AtomCarouselPreviousProps,
  type CarouselRootProps as AtomCarouselRootProps,
  type CarouselRotationControlProps as AtomCarouselRotationControlProps,
  type CarouselSlideProps as AtomCarouselSlideProps,
  type CarouselTrackProps as AtomCarouselTrackProps,
  type CarouselViewportProps as AtomCarouselViewportProps,
} from "@flowstack-ui/atom/carousel";
import { Icon } from "../icon/index.js";

export type CarouselSize = "sm" | "md" | "lg";
export type CarouselRadius = "none" | "surface";
export type CarouselControlPlacement = "overlay" | "outside";
export type CarouselControlSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CarouselControlShape = "rounded" | "circle";
export type CarouselControlVariant = "solid" | "soft" | "outline" | "ghost";
export type CarouselNavigationVisibility = "always" | "interaction";
export type CarouselPickerVariant = "surface" | "bare";

export interface CarouselRootProps extends AtomCarouselRootProps {
  /** Fill an explicitly sized parent and propagate that block size through Viewport, Track, and Slide. @default false */
  fill?: boolean;
  /** Coordinated control and picker scale. @default "md" */
  size?: CarouselSize;
  /** Viewport and overlay-focus corner geometry. @default "surface" */
  radius?: CarouselRadius;
  /** Place navigation over the slide or in document flow. @default "overlay" */
  controlPlacement?: CarouselControlPlacement;
  /** Default visual hierarchy for direction and rotation controls. @default "soft" */
  controlVariant?: CarouselControlVariant;
  /** Default corner geometry for direction and rotation controls. @default "circle" */
  controlShape?: CarouselControlShape;
}

export type CarouselViewportProps = AtomCarouselViewportProps;
export type CarouselTrackProps = AtomCarouselTrackProps;
export type CarouselSlideProps = AtomCarouselSlideProps;
interface CarouselControlVisualProps {
  /** Override the inherited control size. */
  size?: CarouselControlSize;
  /** Override the inherited control shape. */
  shape?: CarouselControlShape;
  /** Override the inherited control visual hierarchy. */
  variant?: CarouselControlVariant;
}

export interface CarouselPreviousProps extends AtomCarouselPreviousProps, CarouselControlVisualProps {}
export interface CarouselNextProps extends AtomCarouselNextProps, CarouselControlVisualProps {}
export interface CarouselPickerProps extends AtomCarouselPickerProps {
  /** Picker container treatment. @default "surface" */
  variant?: CarouselPickerVariant;
}
export type CarouselPickerItemProps = AtomCarouselPickerItemProps;
export interface CarouselRotationControlProps extends AtomCarouselRotationControlProps, CarouselControlVisualProps {}
export interface CarouselNavigationProps extends HTMLAttributes<HTMLDivElement> {
  /** Keep arrows visible or reveal them during pointer, touch, or focus interaction. @default "always" */
  visibility?: CarouselNavigationVisibility;
  "data-slot"?: string;
}
export interface CarouselControlsProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function DirectionIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <Icon className="brick-carousel__control-icon" directional size="sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === "previous" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </Icon>
  );
}

function RotationIcon() {
  return (
    <>
      <Icon className="brick-carousel__rotation-icon brick-carousel__rotation-icon--pause" size="sm">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
      </Icon>
      <Icon className="brick-carousel__rotation-icon brick-carousel__rotation-icon--play" size="sm">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7z" /></svg>
      </Icon>
    </>
  );
}

export const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>(
  function CarouselRoot(
    {
      className,
      controlPlacement = "overlay",
      controlShape = "circle",
      controlVariant = "soft",
      fill = false,
      radius = "surface",
      size = "md",
      "data-slot": dataSlot,
      onPointerUpCapture,
      ...props
    },
    ref,
  ) {
    const [touchNavigationVisible, setTouchNavigationVisible] = useState(false);
    const touchRevealTimerRef = useRef<number | null>(null);

    useEffect(() => () => {
      if (touchRevealTimerRef.current !== null) window.clearTimeout(touchRevealTimerRef.current);
    }, []);

    const handlePointerUpCapture: PointerEventHandler<HTMLDivElement> = (event) => {
      onPointerUpCapture?.(event);
      if (event.defaultPrevented || event.pointerType === "mouse") return;
      if (touchRevealTimerRef.current !== null) window.clearTimeout(touchRevealTimerRef.current);
      setTouchNavigationVisible(true);
      touchRevealTimerRef.current = window.setTimeout(() => {
        touchRevealTimerRef.current = null;
        setTouchNavigationVisible(false);
      }, 2500);
    };

    return (
      <AtomCarousel.Root
        {...props}
        className={mergeClassName("brick-carousel", className)}
        data-control-placement={controlPlacement}
        data-control-shape={controlShape}
        data-control-variant={controlVariant}
        data-fill={fill ? "" : undefined}
        data-radius={radius}
        data-size={size}
        data-slot={dataSlot ?? "carousel"}
        data-touch-navigation={touchNavigationVisible ? "visible" : undefined}
        onPointerUpCapture={handlePointerUpCapture}
        ref={ref}
      />
    );
  },
);

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(
  function CarouselViewport({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Viewport {...props} className={mergeClassName("brick-carousel__viewport", className)} data-slot={dataSlot ?? "carousel-viewport"} ref={ref} />;
  },
);

export const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(
  function CarouselTrack({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Track {...props} className={mergeClassName("brick-carousel__track", className)} data-slot={dataSlot ?? "carousel-track"} ref={ref} />;
  },
);

export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  function CarouselSlide({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Slide {...props} className={mergeClassName("brick-carousel__slide", className)} data-slot={dataSlot ?? "carousel-slide"} ref={ref} />;
  },
);

export const CarouselNavigation = forwardRef<HTMLDivElement, CarouselNavigationProps>(
  function CarouselNavigation({ className, visibility = "always", "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={mergeClassName("brick-carousel__navigation", className)} data-slot={dataSlot ?? "carousel-navigation"} data-visibility={visibility} ref={ref} />;
  },
);

export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  function CarouselPrevious({ children, className, shape, size, variant, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Previous {...props} className={mergeClassName("brick-carousel__previous", className)} data-shape={shape} data-size={size} data-slot={dataSlot ?? "carousel-previous"} data-variant={variant} ref={ref}>{children ?? <DirectionIcon direction="previous" />}</AtomCarousel.Previous>;
  },
);

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  function CarouselNext({ children, className, shape, size, variant, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Next {...props} className={mergeClassName("brick-carousel__next", className)} data-shape={shape} data-size={size} data-slot={dataSlot ?? "carousel-next"} data-variant={variant} ref={ref}>{children ?? <DirectionIcon direction="next" />}</AtomCarousel.Next>;
  },
);

export const CarouselControls = forwardRef<HTMLDivElement, CarouselControlsProps>(
  function CarouselControls({ className, "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={mergeClassName("brick-carousel__controls", className)} data-slot={dataSlot ?? "carousel-controls"} ref={ref} />;
  },
);

export const CarouselRotationControl = forwardRef<HTMLButtonElement, CarouselRotationControlProps>(
  function CarouselRotationControl({ children, className, shape, size, variant, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.RotationControl {...props} className={mergeClassName("brick-carousel__rotation-control", className)} data-shape={shape} data-size={size} data-slot={dataSlot ?? "carousel-rotation-control"} data-variant={variant} ref={ref}>{children ?? <RotationIcon />}</AtomCarousel.RotationControl>;
  },
);

export const CarouselPicker = forwardRef<HTMLDivElement, CarouselPickerProps>(
  function CarouselPicker({ className, variant = "surface", "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Picker {...props} className={mergeClassName("brick-carousel__picker", className)} data-slot={dataSlot ?? "carousel-picker"} data-variant={variant} ref={ref} />;
  },
);

export const CarouselPickerItem = forwardRef<HTMLButtonElement, CarouselPickerItemProps>(
  function CarouselPickerItem({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.PickerItem {...props} className={mergeClassName("brick-carousel__picker-item", className)} data-slot={dataSlot ?? "carousel-picker-item"} ref={ref}>{children ?? <span className="brick-carousel__picker-dot" />}</AtomCarousel.PickerItem>;
  },
);

CarouselRoot.displayName = "Carousel.Root";
CarouselViewport.displayName = "Carousel.Viewport";
CarouselTrack.displayName = "Carousel.Track";
CarouselSlide.displayName = "Carousel.Slide";
CarouselNavigation.displayName = "Carousel.Navigation";
CarouselPrevious.displayName = "Carousel.Previous";
CarouselNext.displayName = "Carousel.Next";
CarouselControls.displayName = "Carousel.Controls";
CarouselRotationControl.displayName = "Carousel.RotationControl";
CarouselPicker.displayName = "Carousel.Picker";
CarouselPickerItem.displayName = "Carousel.PickerItem";

export const Carousel = Object.freeze({
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Navigation: CarouselNavigation,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Controls: CarouselControls,
  RotationControl: CarouselRotationControl,
  Picker: CarouselPicker,
  PickerItem: CarouselPickerItem,
});
