import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  Button as AtomButton,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";

export type ButtonTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonShape = "sharp" | "rounded" | "pill";

interface ButtonVisualProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

type ButtonSharedProps = Omit<
  AtomButtonRootProps,
  "color" | "asChild" | "render"
> &
  ButtonVisualProps;

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

function mergeClassName(className: string | undefined) {
  return className ? `brick-button ${className}` : "brick-button";
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant = "solid",
    tone = "accent",
    size = "md",
    shape = "rounded",
    fullWidth = false,
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

  return (
    <AtomButton.Root
      {...rootProps}
      asChild={asChild}
      className={mergeClassName(className)}
      data-full-width={fullWidth ? "" : undefined}
      data-shape={shape}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      ref={ref}
      render={render}
    >
      {content}
    </AtomButton.Root>
  );
});

Button.displayName = "Button";
