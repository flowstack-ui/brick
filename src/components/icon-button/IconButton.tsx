import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import type { ButtonSize, ButtonTone, ButtonVariant } from "../button/Button.js";

export type IconButtonVariant = ButtonVariant;
export type IconButtonTone = ButtonTone;
export type IconButtonSize = ButtonSize;
export type IconButtonShape = "rounded" | "circle";

interface IconButtonVisualProps {
  /** Visual hierarchy. @default "ghost" */
  variant?: IconButtonVariant;
  /** Semantic color role. @default "neutral" */
  tone?: IconButtonTone;
  /** Complete square control size. @default "lg" */
  size?: ResponsiveValue<IconButtonSize>;
  /** Corner geometry. @default "rounded" */
  shape?: IconButtonShape;
}

type IconButtonSharedProps = Omit<
  AtomButtonRootProps,
  "asChild" | "color" | "render"
> & IconButtonVisualProps;

export type IconButtonProps = IconButtonSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement;
      }
    | {
        asChild?: false;
        render?: AtomButtonRootProps["render"];
        children: ReactNode;
      }
  );

function mergeClassName(className: string | undefined) {
  return className ? `brick-icon-button ${className}` : "brick-icon-button";
}

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  function IconButton(
    {
      variant = "ghost",
      tone = "neutral",
      size = "lg",
      shape = "rounded",
      className,
      children,
      asChild = false,
      render,
      ...rootProps
    },
    ref,
  ) {
    const content = asChild ? children : (
      <span aria-hidden="true" className="brick-icon-button__icon">
        {children}
      </span>
    );

    return (
      <AtomButtonRoot
        {...rootProps}
        asChild={asChild}
        className={mergeClassName(className)}
        data-shape={shape}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
        render={render}
        {...responsiveDataAttributes("data-size", size, {
          alwaysInitial: true,
          defaultValue: "lg",
        })}
      >
        {content}
      </AtomButtonRoot>
    );
  },
);

IconButton.displayName = "IconButton";
