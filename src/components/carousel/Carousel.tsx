"use client";

import { forwardRef, type HTMLAttributes } from "react";
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
export type CarouselControlPlacement = "overlay" | "outside";

export interface CarouselRootProps extends AtomCarouselRootProps {
  /** Coordinated control and picker scale. @default "md" */
  size?: CarouselSize;
  /** Place navigation over the slide or in document flow. @default "overlay" */
  controlPlacement?: CarouselControlPlacement;
}

export type CarouselViewportProps = AtomCarouselViewportProps;
export type CarouselTrackProps = AtomCarouselTrackProps;
export type CarouselSlideProps = AtomCarouselSlideProps;
export type CarouselPreviousProps = AtomCarouselPreviousProps;
export type CarouselNextProps = AtomCarouselNextProps;
export type CarouselPickerProps = AtomCarouselPickerProps;
export type CarouselPickerItemProps = AtomCarouselPickerItemProps;
export type CarouselRotationControlProps = AtomCarouselRotationControlProps;
export interface CarouselNavigationProps extends HTMLAttributes<HTMLDivElement> {
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
  function CarouselRoot({ className, controlPlacement = "overlay", size = "md", "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Root {...props} className={mergeClassName("brick-carousel", className)} data-control-placement={controlPlacement} data-size={size} data-slot={dataSlot ?? "carousel"} ref={ref} />;
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
  function CarouselNavigation({ className, "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={mergeClassName("brick-carousel__navigation", className)} data-slot={dataSlot ?? "carousel-navigation"} ref={ref} />;
  },
);

export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  function CarouselPrevious({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Previous {...props} className={mergeClassName("brick-carousel__previous", className)} data-slot={dataSlot ?? "carousel-previous"} ref={ref}>{children ?? <DirectionIcon direction="previous" />}</AtomCarousel.Previous>;
  },
);

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  function CarouselNext({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Next {...props} className={mergeClassName("brick-carousel__next", className)} data-slot={dataSlot ?? "carousel-next"} ref={ref}>{children ?? <DirectionIcon direction="next" />}</AtomCarousel.Next>;
  },
);

export const CarouselControls = forwardRef<HTMLDivElement, CarouselControlsProps>(
  function CarouselControls({ className, "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={mergeClassName("brick-carousel__controls", className)} data-slot={dataSlot ?? "carousel-controls"} ref={ref} />;
  },
);

export const CarouselRotationControl = forwardRef<HTMLButtonElement, CarouselRotationControlProps>(
  function CarouselRotationControl({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.RotationControl {...props} className={mergeClassName("brick-carousel__rotation-control", className)} data-slot={dataSlot ?? "carousel-rotation-control"} ref={ref}>{children ?? <RotationIcon />}</AtomCarousel.RotationControl>;
  },
);

export const CarouselPicker = forwardRef<HTMLDivElement, CarouselPickerProps>(
  function CarouselPicker({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomCarousel.Picker {...props} className={mergeClassName("brick-carousel__picker", className)} data-slot={dataSlot ?? "carousel-picker"} ref={ref} />;
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
