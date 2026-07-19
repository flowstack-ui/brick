import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  Button as AtomButton,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";
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
  /** Complete square control size. @default "md" */
  size?: IconButtonSize;
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
      size = "md",
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
      <AtomButton.Root
        {...rootProps}
        asChild={asChild}
        className={mergeClassName(className)}
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
  },
);

IconButton.displayName = "IconButton";
