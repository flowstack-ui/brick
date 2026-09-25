"use client";

import { forwardRef, type ReactElement, type ReactNode } from "react";
import { useButtonGroupDefaults } from "../button/ButtonGroup.js";
import { ButtonBase } from "../button/Button.js";
import { type Radius, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";
import {
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import type { ButtonSize, ButtonTone, ButtonVariant } from "../button/Button.js";

export type IconButtonVariant = ButtonVariant;
export type IconButtonTone = ButtonTone;
export type IconButtonSize = ButtonSize;
export type IconButtonShape = "rounded" | "circle";

interface IconButtonVisualProps {
  /** Focus placement only; keyboard modality remains browser/Atom owned. */
  focusRing?: "outside" | "inside";
  /** Visual hierarchy. @default "ghost" */
  variant?: IconButtonVariant;
  /** Semantic color role. @default "neutral" */
  tone?: IconButtonTone;
  /** Complete square control size. @default "lg" */
  size?: ResponsiveValue<IconButtonSize>;
  /** Corner geometry. @default "rounded" */
  shape?: IconButtonShape;
  radius?: Radius;
}

type IconButtonSharedProps = Omit<
  AtomButtonRootProps,
  "asChild" | "color" | "render"
> & Omit<IconButtonVisualProps, "shape" | "radius"> & RadiusShapeProps<IconButtonShape>;

export type IconButtonProps = IconButtonSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement;
        spinner?: never;
      }
    | {
        asChild?: false;
        render?: AtomButtonRootProps["render"];
        children: ReactNode;
        spinner?: ReactNode;
      }
  );

function mergeClassName(className: string | undefined) {
  return className ? `brick-icon-button ${className}` : "brick-icon-button";
}

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  function IconButton(
    {
      variant: ownVariant,
      tone: ownTone,
      size: ownSize,
      shape,
      radius: ownRadius,
      focusRing: ownFocusRing,
      style,
      className,
      children,
      asChild = false,
      render,
      spinner,
      ...rootProps
    },
    ref,
  ) {
    const defaults = useButtonGroupDefaults();
    const variant = ownVariant ?? defaults.variant ?? "ghost";
    const tone = ownTone ?? defaults.tone ?? "neutral";
    const size = ownSize ?? defaults.size ?? "lg";
    const radius = ownRadius ?? (shape === undefined ? defaults.radius : undefined);
    const focusRing = ownFocusRing ?? defaults.focusRing;
    return asChild ? (
      <ButtonBase {...rootProps} asChild iconShape={shape} ref={ref} className={mergeClassName(className)} variant={variant} tone={tone} size={size} {...(radius !== undefined ? {radius} : {shape: shape === "circle" ? "pill" as const : "rounded" as const})} focusRing={focusRing} style={style}>{children as ReactElement}</ButtonBase>
    ) : (
      <ButtonBase {...rootProps} iconOnly iconShape={shape} ref={ref} render={render} className={mergeClassName(className)} variant={variant} tone={tone} size={size} {...(radius !== undefined ? {radius} : {shape: shape === "circle" ? "pill" as const : "rounded" as const})} focusRing={focusRing} style={style} spinner={spinner}>{children}</ButtonBase>
    );
  },
);

IconButton.displayName = "IconButton";
