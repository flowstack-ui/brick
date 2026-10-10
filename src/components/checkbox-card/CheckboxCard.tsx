"use client";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
} from "react";
import {
  CheckboxCard as AtomCard,
  useCheckboxCardContext,
  type CheckboxCardRootProps as AtomRootProps,
  type CheckboxCardRootProviderProps as AtomProviderProps,
  type CheckboxCardPartProps,
} from "@flowstack-ui/atom/checkbox-card";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import { Checkmark } from "../checkmark/Checkmark.js";
import type { CheckboxTone } from "../checkbox/CheckboxPresentation.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type CheckboxCardSize = "sm" | "md" | "lg";
export type CheckboxCardVariant = "outline" | "surface" | "subtle" | "solid";
export interface CheckboxCardPresentationProps {
  size?: ResponsiveValue<CheckboxCardSize>;
  variant?: ResponsiveValue<CheckboxCardVariant>;
  tone?: CheckboxTone;
  radius?: Radius;
  orientation?: ResponsiveValue<"horizontal" | "vertical">;
  align?: ResponsiveValue<"start" | "center" | "end">;
  justify?: ResponsiveValue<"start" | "center" | "end">;
}
export interface CheckboxCardRootProps
  extends AtomRootProps,
    CheckboxCardPresentationProps {}
export interface CheckboxCardRootProviderProps
  extends AtomProviderProps,
    CheckboxCardPresentationProps {}
const Presentation = createContext<CheckboxTone>("accent");
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;
function presentation({
  size = "md",
  variant = "outline",
  tone = "accent",
  radius,
  orientation = "horizontal",
  align = "start",
  justify = "start",
  className,
  style,
  ...props
}: CheckboxCardRootProps | CheckboxCardRootProviderProps) {
  return {
    tone,
    props: {
      ...props,
      className: cn("brick-checkbox-card", className),
      "data-tone": tone,
      ...responsiveDataAttributes("data-size", size, {
        defaultValue: "md",
        alwaysInitial: true,
      }),
      ...responsiveDataAttributes("data-variant", variant, {
        defaultValue: "outline",
        alwaysInitial: true,
      }),
      ...responsiveDataAttributes("data-orientation", orientation, {
        defaultValue: "horizontal",
        alwaysInitial: true,
      }),
      ...responsiveDataAttributes("data-align", align, {
        defaultValue: "start",
        alwaysInitial: true,
      }),
      ...responsiveDataAttributes("data-justify", justify, {
        defaultValue: "start",
        alwaysInitial: true,
      }),
      style: radiusStyle(radius, "--brick-checkbox-card-radius", style),
    },
  };
}
export const CheckboxCardRoot = forwardRef<
  HTMLLabelElement,
  CheckboxCardRootProps
>(function CheckboxCardRoot(props, ref) {
  const result = presentation(props);
  return (
    <Presentation.Provider value={result.tone}>
      <AtomCard.Root {...(result.props as AtomRootProps)} ref={ref} />
    </Presentation.Provider>
  );
});
export const CheckboxCardRootProvider = forwardRef<
  HTMLLabelElement,
  CheckboxCardRootProviderProps
>(function CheckboxCardRootProvider(props, ref) {
  const result = presentation(props);
  return (
    <Presentation.Provider value={result.tone}>
      <AtomCard.RootProvider
        {...(result.props as AtomProviderProps)}
        ref={ref}
      />
    </Presentation.Provider>
  );
});
function part(Component: typeof AtomCard.Control, name: string) {
  return forwardRef<HTMLSpanElement, CheckboxCardPartProps>(
    function CheckboxCardPart({ className, ...props }, ref) {
      return (
        <Component
          {...props}
          ref={ref}
          className={cn(`brick-checkbox-card__${name}`, className)}
        />
      );
    },
  );
}
export const CheckboxCardControl = part(AtomCard.Control, "control");
export const CheckboxCardLabel = part(AtomCard.Label, "label");
export const CheckboxCardDescription = part(
  AtomCard.Description,
  "description",
);
export interface CheckboxCardRegionProps
  extends ComponentPropsWithoutRef<"span"> {
  asChild?: boolean;
}
function region(name: string) {
  return forwardRef<HTMLSpanElement, CheckboxCardRegionProps>(
    function CheckboxCardRegion(
      { asChild, children, className, ...props },
      ref,
    ) {
      const attrs = {
        ...props,
        ref,
        className: cn(`brick-checkbox-card__${name}`, className),
        "data-slot": `checkbox-card-${name}`,
      };
      return asChild ? (
        composeHost(children, attrs)
      ) : (
        <span {...attrs}>{children}</span>
      );
    },
  );
}
export const CheckboxCardContent = region("content");
export const CheckboxCardAddon = region("addon");
export const CheckboxCardIndicator = forwardRef<
  HTMLSpanElement,
  CheckboxCardPartProps
>(function CheckboxCardIndicator({ children, className, ...props }, ref) {
  const state = useCheckboxCardContext();
  const tone = useContext(Presentation);
  return (
    <AtomCard.Indicator
      {...props}
      ref={ref}
      className={cn("brick-checkbox-card__indicator", className)}
    >
      {children ?? (
        <Checkmark
          tone={tone}
          checked={state.checked === true}
          indeterminate={state.checked === "indeterminate"}
        />
      )}
    </AtomCard.Indicator>
  );
});
export {
  useCheckboxCard,
  useCheckboxCardContext,
} from "@flowstack-ui/atom/checkbox-card";
export const CheckboxCardHiddenInput = AtomCard.HiddenInput;
export const CheckboxCardContext = AtomCard.Context;
export const CheckboxCard = {
  Root: CheckboxCardRoot,
  RootProvider: CheckboxCardRootProvider,
  HiddenInput: CheckboxCardHiddenInput,
  Control: CheckboxCardControl,
  Content: CheckboxCardContent,
  Label: CheckboxCardLabel,
  Description: CheckboxCardDescription,
  Indicator: CheckboxCardIndicator,
  Addon: CheckboxCardAddon,
  Context: CheckboxCardContext,
} as const;
