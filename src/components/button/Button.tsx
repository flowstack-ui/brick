"use client";

import { forwardRef, type ReactElement, type ReactNode } from "react";
import { useButtonGroupDefaults } from "./ButtonGroup.js";
import { Spinner } from "../spinner/Spinner.js";
import { radiusStyle, type Radius, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type ButtonVariant = "solid" | "soft" | "subtle" | "surface" | "outline" | "ghost" | "plain";

export type ButtonTone =
  "neutral" | "contrast" | "accent" | "info" | "success" | "warning" | "danger";

export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ButtonShape = "sharp" | "rounded" | "pill";

export interface ButtonVisualProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ResponsiveValue<ButtonSize>;
  shape?: ButtonShape;
  radius?: Radius;
  fullWidth?: boolean;
  /** Focus presentation inside a clipping composition; omission stays outside. */
  focusRing?: "outside" | "inside";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

type ButtonSharedProps = Omit<
  AtomButtonRootProps,
  "color" | "asChild" | "render"
> &
  Omit<ButtonVisualProps, "shape" | "radius"> & RadiusShapeProps<ButtonShape>;

export type ButtonProps = ButtonSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        startIcon?: never;
        endIcon?: never;
        loadingText?: never;
        spinner?: never;
        spinnerPlacement?: never;
        children: ReactElement;
      }
    | {
        asChild?: false;
        render?: AtomButtonRootProps["render"];
        loadingText?: ReactNode;
        spinner?: ReactNode;
        spinnerPlacement?: "start" | "end";
      }
  );

/** Internal shared presentation; behavior remains with the consuming Atom owner. */
export function buttonPresentation(
  { variant = "solid", tone = "accent", size = "lg", shape = "rounded", radius, fullWidth = false, focusRing }: ButtonVisualProps,
  className?: string,
  defaultSize: ButtonSize = "lg",
) {
  return {
    className: className ? `brick-button ${className}` : "brick-button",
    "data-full-width": fullWidth ? "" : undefined,
    "data-focus-ring": focusRing,
    "data-shape": radius === undefined ? shape : "rounded",
    style: radiusStyle(radius, "--brick-button-radius"),
    "data-tone": tone,
    "data-variant": variant,
    ...responsiveDataAttributes("data-size", size, {
      alwaysInitial: true,
      defaultValue: defaultSize,
    }),
  };
}

export function ButtonContent(
  { children, startIcon, endIcon }: Pick<ButtonVisualProps, "startIcon" | "endIcon"> & { children?: ReactNode },
) {
  return (
    <>
      {startIcon !== undefined ? (
        <span aria-hidden="true" className="brick-button__icon" data-position="start">
          {startIcon}
        </span>
      ) : null}
      <span className="brick-button__content">{children}</span>
      {endIcon !== undefined ? (
        <span aria-hidden="true" className="brick-button__icon" data-position="end">
          {endIcon}
        </span>
      ) : null}
    </>
  );
}

/** Internal icon-only mode is not part of Button's public API. */
export const ButtonBase = forwardRef<HTMLElement, ButtonProps & { iconOnly?: boolean; iconShape?: "rounded" | "circle" }>(function Button(
  {
    variant: ownVariant,
    tone: ownTone,
    size: ownSize,
    shape,
    radius: ownRadius,
    style,
    fullWidth = false,
    focusRing: ownFocusRing,
    startIcon,
    endIcon,
    className,
    children,
    asChild = false,
    render,
    loadingText,
    spinner,
    spinnerPlacement = "start",
    iconOnly = false,
    iconShape,
    ...rootProps
  },
  ref,
) {
  const defaults = useButtonGroupDefaults();
  const variant = ownVariant ?? defaults.variant;
  const tone = ownTone ?? defaults.tone;
  const size = ownSize ?? defaults.size;
  const radius = ownRadius ?? (shape === undefined ? defaults.radius : undefined);
  const focusRing = ownFocusRing ?? defaults.focusRing;
  const hasLoadingText = loadingText !== undefined && loadingText !== null && typeof loadingText !== "boolean";
  const customLoading = !asChild && rootProps.loading && (hasLoadingText || spinner !== undefined);
  const indicator = <span aria-hidden="true" className="brick-button__spinner">{spinner === undefined ? <Spinner size="inherit" /> : spinner}</span>;
  const content = asChild ? (
    children
  ) : (
    customLoading && hasLoadingText ? (
      <span className="brick-button__loading-content">
        {spinnerPlacement === "start" ? indicator : null}
        <span>{loadingText}</span>
        {spinnerPlacement === "end" ? indicator : null}
      </span>
    ) : (
      <>
        {iconOnly ? <span aria-hidden="true" className="brick-icon-button__icon">{children}</span> : <ButtonContent startIcon={startIcon} endIcon={endIcon}>{children}</ButtonContent>}
        {customLoading ? <span className="brick-button__loading-overlay">{indicator}</span> : null}
      </>
    )
  );

  return (
    <AtomButtonRoot
      {...rootProps}
      asChild={asChild}
      data-custom-loading={customLoading ? "" : undefined}
      {...buttonPresentation({ variant, tone, size, shape, radius, fullWidth, focusRing }, className)}
      data-shape={radius === undefined ? iconShape ?? shape ?? "rounded" : "rounded"}
      style={radiusStyle(radius, "--brick-button-radius", style)}
      ref={ref}
      render={render}
    >
      {content}
    </AtomButtonRoot>
  );
});

ButtonBase.displayName = "Button";
export const Button: ReturnType<typeof forwardRef<HTMLElement, ButtonProps>> = ButtonBase;
