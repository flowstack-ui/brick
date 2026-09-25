"use client";
import {
  createContext,
  forwardRef,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Carousel as AtomCarousel,
  useCarouselContext,
  type CarouselRootProps as AtomRootProps,
  type CarouselRootProviderProps as AtomProviderProps,
  type CarouselViewportProps,
  type CarouselTrackProps,
  type CarouselSlideProps,
  type CarouselPreviousProps as AtomPreviousProps,
  type CarouselNextProps as AtomNextProps,
  type CarouselRotationControlProps as AtomRotationProps,
  type CarouselPickerProps as AtomPickerProps,
  type CarouselPickerItemProps as AtomPickerItemProps,
} from "@flowstack-ui/atom/carousel";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  responsiveDataAttributes,
  normalizeResponsiveValue,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  buttonPresentation,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "../button/Button.js";
import { Icon } from "../icon/index.js";
export {
  useCarousel,
  useCarouselContext,
  type UseCarouselProps,
  type CarouselPageChangeDetails,
  type CarouselTranslations,
} from "@flowstack-ui/atom/carousel";
export type { CarouselViewportProps, CarouselTrackProps, CarouselSlideProps };
export type CarouselSize = "sm" | "md" | "lg";
export type CarouselRadius = Radius;
export type CarouselTone = "neutral" | "contrast" | "accent";
export type CarouselControlPlacement = "overlay" | "outside";
export type CarouselControlSize = ButtonSize;
export type CarouselControlShape = "rounded" | "circle";
export type CarouselControlVariant = ButtonVariant;
export type CarouselNavigationVisibility = "always" | "interaction";
export type CarouselPickerVariant = "surface" | "bare";
export interface CarouselRecipeProps {
  fill?: boolean;
  size?: ResponsiveValue<CarouselSize>;
  radius?: Radius;
  controlPlacement?: CarouselControlPlacement;
  controlVariant?: ButtonVariant;
  controlShape?: CarouselControlShape;
  controlTone?: ButtonTone;
  controlSize?: ResponsiveValue<ButtonSize>;
  tone?: CarouselTone;
  spacing?: string | number;
  padding?: string | number;
}
export type CarouselRootProps = AtomRootProps & CarouselRecipeProps;
export interface CarouselRootProviderProps
  extends AtomProviderProps,
    CarouselRecipeProps {}
export interface CarouselPropsProviderProps {
  value: CarouselRecipeProps;
  children?: ReactNode;
}
const Recipes = createContext<CarouselRecipeProps>({});
export function CarouselPropsProvider({
  value,
  children,
}: CarouselPropsProviderProps) {
  const parent = useContext(Recipes);
  return (
    <Recipes.Provider value={{ ...parent, ...value }}>
      {children}
    </Recipes.Provider>
  );
}
const merge = (base: string, className?: string) =>
  className ? `${base} ${className}` : base;
const space = (value: string | number | undefined) =>
  value === undefined
    ? undefined
    : typeof value === "number" || /^\d+$/.test(value)
      ? `var(--brick-space-${value})`
      : value;
function useRootPresentation(
  props: CarouselRecipeProps & { className?: string; style?: CSSProperties },
) {
  const inherited = useContext(Recipes);
  const {
    fill,
    size,
    radius,
    controlPlacement,
    controlVariant,
    controlShape,
    controlTone,
    controlSize,
    tone,
    spacing,
    padding,
    className,
    style,
    ...rest
  } = props;
  const defaults = {
    fill: false,
    size: "md" as const,
    controlPlacement: "overlay" as const,
    controlVariant: "soft" as const,
    controlShape: "circle" as const,
    controlTone: "neutral" as const,
    tone: "accent" as const,
    ...inherited,
  };
  const own = {
    fill,
    size,
    radius,
    controlPlacement,
    controlVariant,
    controlShape,
    controlTone,
    controlSize,
    tone,
    spacing,
    padding,
  };
  const recipe = {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(own).filter(([, value]) => value !== undefined),
    ),
  } as CarouselRecipeProps;
  return {
    recipe,
    props: {
      ...rest,
      className: merge("brick-carousel", className),
      "data-fill": recipe.fill ? "" : undefined,
      "data-control-placement": recipe.controlPlacement,
      "data-control-variant": recipe.controlVariant,
      "data-control-shape": recipe.controlShape,
      "data-tone": recipe.tone,
      "data-radius": recipe.radius ?? "surface",
      ...responsiveDataAttributes("data-size", recipe.size ?? "md", {
        defaultValue: "md",
        alwaysInitial: true,
      }),
      style: radiusStyle(recipe.radius, "--brick-carousel-radius", {
        ...(space(recipe.spacing) !== undefined
          ? { "--brick-carousel-spacing": space(recipe.spacing) }
          : {}),
        ...(space(recipe.padding) !== undefined
          ? { "--brick-carousel-padding": space(recipe.padding) }
          : {}),
        ...style,
      } as CSSProperties),
    },
  };
}
export const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>(
  function CarouselRoot({ children, "data-slot": slot, ...props }, ref) {
    const presentation = useRootPresentation(props);
    return (
      <Recipes.Provider value={presentation.recipe}>
        <AtomCarousel.Root
          {...presentation.props}
          data-slot={slot ?? "carousel"}
          ref={ref}
        >
          {children}
        </AtomCarousel.Root>
      </Recipes.Provider>
    );
  },
);
export const CarouselRootProvider = forwardRef<
  HTMLDivElement,
  CarouselRootProviderProps
>(function CarouselRootProvider(
  { children, value, "data-slot": slot, ...props },
  ref,
) {
  const presentation = useRootPresentation(props);
  return (
    <Recipes.Provider value={presentation.recipe}>
      <AtomCarousel.RootProvider
        {...presentation.props}
        value={value}
        data-slot={slot ?? "carousel"}
        ref={ref}
      >
        {children}
      </AtomCarousel.RootProvider>
    </Recipes.Provider>
  );
});
export const CarouselViewport = forwardRef<
  HTMLDivElement,
  CarouselViewportProps
>(function CarouselViewport({ className, "data-slot": slot, ...props }, ref) {
  return (
    <AtomCarousel.Viewport
      {...props}
      className={merge("brick-carousel__viewport", className)}
      data-slot={slot ?? "carousel-viewport"}
      ref={ref}
    />
  );
});
export const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(
  function CarouselTrack({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomCarousel.Track
        {...props}
        className={merge("brick-carousel__track", className)}
        data-slot={slot ?? "carousel-track"}
        ref={ref}
      />
    );
  },
);
export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  function CarouselSlide({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomCarousel.Slide
        {...props}
        className={merge("brick-carousel__slide", className)}
        data-slot={slot ?? "carousel-slide"}
        ref={ref}
      />
    );
  },
);

interface ControlVisualProps {
  unstyled?: boolean;
  size?: ResponsiveValue<ButtonSize>;
  shape?: CarouselControlShape;
  radius?: Radius;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  focusRing?: "inside" | "outside";
}
export interface CarouselPreviousProps
  extends AtomPreviousProps,
    ControlVisualProps {}
export interface CarouselNextProps extends AtomNextProps, ControlVisualProps {}
export interface CarouselRotationControlProps
  extends AtomRotationProps,
    ControlVisualProps {}
function useControlPresentation(
  props: ControlVisualProps & { className?: string; style?: CSSProperties },
  part: string,
) {
  const recipe = useContext(Recipes);
  const {
    unstyled,
    size,
    shape,
    radius,
    variant,
    tone,
    focusRing,
    className,
    style,
    ...rest
  } = props;
  const rootSizes = normalizeResponsiveValue(recipe.size ?? "md");
  const inheritedSize = Object.fromEntries(
    Object.entries(rootSizes).map(([key, value]) => [
      key,
      value === "sm" ? "sm" : value === "lg" ? "xl" : "lg",
    ]),
  ) as ResponsiveValue<ButtonSize>;
  const visual = buttonPresentation(
    {
      size: size ?? recipe.controlSize ?? inheritedSize,
      variant: variant ?? recipe.controlVariant ?? "soft",
      tone: tone ?? recipe.controlTone ?? "neutral",
      shape: "rounded",
      radius,
      focusRing,
    },
    merge(`brick-icon-button brick-carousel__${part}`, className),
  );
  if (unstyled)
    return {
      ...rest,
      className: merge(`brick-carousel__${part}`, className),
      style,
    };
  return {
    ...rest,
    ...visual,
    "data-shape":
      radius === undefined
        ? (shape ?? recipe.controlShape ?? "circle")
        : "rounded",
    style: { ...visual.style, ...style },
  };
}
function DirectionIcon({ previous }: { previous?: boolean }) {
  const api = useCarouselContext();
  const path =
    api.orientation === "vertical"
      ? previous
        ? "m6 15 6-6 6 6"
        : "m6 9 6 6 6-6"
      : previous
        ? "m15 18-6-6 6-6"
        : "m9 18 6-6-6-6";
  return (
    <Icon
      directional={api.orientation === "horizontal"}
      className="brick-carousel__control-icon"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </Icon>
  );
}
export const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(function CarouselPrevious({ children, ...props }, ref) {
  const visual = useControlPresentation(props, "previous");
  return (
    <AtomCarousel.Previous {...visual} ref={ref}>
      {children ?? <DirectionIcon previous />}
    </AtomCarousel.Previous>
  );
});
export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  function CarouselNext({ children, ...props }, ref) {
    const visual = useControlPresentation(props, "next");
    return (
      <AtomCarousel.Next {...visual} ref={ref}>
        {children ?? <DirectionIcon />}
      </AtomCarousel.Next>
    );
  },
);
export interface CarouselAutoplayIndicatorProps {
  play?: ReactNode;
  paused?: ReactNode;
}
export function CarouselAutoplayIndicator({
  play,
  paused,
}: CarouselAutoplayIndicatorProps) {
  const api = useCarouselContext();
  return (
    <>
      {api.autoPlay
        ? (paused ?? (
            <Icon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            </Icon>
          ))
        : (play ?? (
            <Icon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="m8 5 11 7-11 7z" />
              </svg>
            </Icon>
          ))}
    </>
  );
}
export const CarouselRotationControl = forwardRef<
  HTMLButtonElement,
  CarouselRotationControlProps
>(function CarouselRotationControl({ children, ...props }, ref) {
  const visual = useControlPresentation(props, "rotation-control");
  return (
    <AtomCarousel.RotationControl {...visual} ref={ref}>
      {children ?? <CarouselAutoplayIndicator />}
    </AtomCarousel.RotationControl>
  );
});
export interface CarouselNavigationProps
  extends HTMLAttributes<HTMLDivElement> {
  visibility?: CarouselNavigationVisibility;
  "data-slot"?: string;
}
export interface CarouselControlsProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}
export const CarouselNavigation = forwardRef<
  HTMLDivElement,
  CarouselNavigationProps
>(function CarouselNavigation(
  { className, visibility = "always", "data-slot": slot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={merge("brick-carousel__navigation", className)}
      data-visibility={visibility}
      data-slot={slot ?? "carousel-navigation"}
      ref={ref}
    />
  );
});
export const CarouselControls = forwardRef<
  HTMLDivElement,
  CarouselControlsProps
>(function CarouselControls({ className, "data-slot": slot, ...props }, ref) {
  return (
    <div
      {...props}
      className={merge("brick-carousel__controls", className)}
      data-slot={slot ?? "carousel-controls"}
      ref={ref}
    />
  );
});
export interface CarouselPickerProps extends AtomPickerProps {
  variant?: CarouselPickerVariant;
}
export type CarouselPickerItemProps = AtomPickerItemProps & {
  variant?: "dot" | "thumbnail";
  indicatorShape?: "circle" | "pill";
  radius?: Radius;
};
export const CarouselPicker = forwardRef<HTMLDivElement, CarouselPickerProps>(
  function CarouselPicker({ className, variant = "surface", ...props }, ref) {
    return (
      <AtomCarousel.Picker
        {...props}
        className={merge("brick-carousel__picker", className)}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);
export const CarouselPickerItem = forwardRef<
  HTMLButtonElement,
  CarouselPickerItemProps
>(function CarouselPickerItem(
  {
    className,
    children,
    variant = "dot",
    indicatorShape = "circle",
    radius,
    style,
    ...props
  },
  ref,
) {
  return (
    <AtomCarousel.PickerItem
      {...props}
      className={merge("brick-carousel__picker-item", className)}
      data-variant={variant}
      data-indicator-shape={indicatorShape}
      style={radiusStyle(radius, "--brick-carousel-thumbnail-radius", style)}
      ref={ref}
    >
      {children ?? <span className="brick-carousel__picker-dot" />}
    </AtomCarousel.PickerItem>
  );
});
export interface CarouselIndicatorsProps extends CarouselPickerProps {
  itemProps?: Omit<CarouselPickerItemProps, "value" | "page">;
}
export const CarouselIndicators = forwardRef<
  HTMLDivElement,
  CarouselIndicatorsProps
>(function CarouselIndicators({ itemProps, ...props }, ref) {
  const api = useCarouselContext();
  return (
    <CarouselPicker {...props} ref={ref}>
      {api.pageSnapPoints.map((page, index) => (
        <CarouselPickerItem {...itemProps} page={index} key={page.value || `page-${index}`} />
      ))}
    </CarouselPicker>
  );
});
export interface CarouselProgressTextProps
  extends HTMLAttributes<HTMLDivElement> {
  format?: (page: number, count: number) => ReactNode;
}
export const CarouselProgressText = forwardRef<
  HTMLDivElement,
  CarouselProgressTextProps
>(function CarouselProgressText(
  { format, children, className, ...props },
  ref,
) {
  const api = useCarouselContext();
  const count = api.pageSnapPoints.length;
  return (
    <div
      {...props}
      className={merge("brick-carousel__progress-text", className)}
      ref={ref}
    >
      {children ??
        (format ?? api.translations?.progress)?.(
          count ? api.page + 1 : 0,
          count,
        ) ??
        `${count ? api.page + 1 : 0} / ${count}`}
    </div>
  );
});
export function CarouselContext({
  children,
}: {
  children: (api: ReturnType<typeof useCarouselContext>) => ReactNode;
}) {
  return <>{children(useCarouselContext())}</>;
}
export const Carousel = Object.freeze({
  Root: CarouselRoot,
  RootProvider: CarouselRootProvider,
  PropsProvider: CarouselPropsProvider,
  Context: CarouselContext,
  Viewport: CarouselViewport,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Navigation: CarouselNavigation,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Controls: CarouselControls,
  RotationControl: CarouselRotationControl,
  AutoplayIndicator: CarouselAutoplayIndicator,
  Picker: CarouselPicker,
  PickerItem: CarouselPickerItem,
  Indicators: CarouselIndicators,
  ProgressText: CarouselProgressText,
});
