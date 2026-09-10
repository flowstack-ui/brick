import { forwardRef, type ReactElement, type ReactNode } from "react";
import { radiusStyle, type Radius, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";

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
        children: ReactElement;
      }
    | {
        asChild?: false;
        render?: AtomButtonRootProps["render"];
      }
  );

/** Internal shared presentation; behavior remains with the consuming Atom owner. */
export function buttonPresentation(
  { variant = "solid", tone = "accent", size = "lg", shape = "rounded", radius, fullWidth = false, focusRing }: ButtonVisualProps,
  className?: string,
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
      defaultValue: "lg",
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

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant = "solid",
    tone = "accent",
    size = "lg",
    shape = "rounded",
    radius,
    style,
    fullWidth = false,
    focusRing,
    startIcon,
    endIcon,
    className,
    children,
    asChild = false,
    render,
    ...rootProps
  },
  ref,
) {
  const content = asChild ? (
    children
  ) : (
    <ButtonContent startIcon={startIcon} endIcon={endIcon}>{children}</ButtonContent>
  );

  return (
    <AtomButtonRoot
      {...rootProps}
      asChild={asChild}
      {...buttonPresentation({ variant, tone, size, shape, radius, fullWidth, focusRing }, className)}
      style={radiusStyle(radius, "--brick-button-radius", style)}
      ref={ref}
      render={render}
    >
      {content}
    </AtomButtonRoot>
  );
});

Button.displayName = "Button";
