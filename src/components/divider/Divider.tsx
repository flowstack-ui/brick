import {
  forwardRef,
  isValidElement,
  type CSSProperties,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Divider as AtomDivider,
  type DividerRootProps,
} from "@flowstack-ui/atom/divider";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerThickness = "subtle" | "regular" | "strong";
export type DividerInset = "none" | "start" | "both";
export type DividerLabelAlign = "start" | "center" | "end";
export type DividerElement = HTMLHRElement | HTMLDivElement;

type DividerSharedProps = Omit<
  DividerRootProps,
  "asChild" | "children" | "className" | "orientation" | "style"
> & {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  thickness?: DividerThickness;
  inset?: DividerInset;
  stretch?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

export interface DividerLineProps extends DividerSharedProps {
  children?: never;
  labelAlign?: never;
  asChild?: false;
}

export interface DividerComposedProps extends DividerSharedProps {
  asChild: true;
  children: ReactElement;
  labelAlign?: never;
}

export interface DividerLabelProps extends DividerSharedProps {
  children: ReactNode;
  orientation?: "horizontal";
  labelAlign?: DividerLabelAlign;
  asChild?: never;
}

export type DividerProps =
  | DividerLineProps
  | DividerComposedProps
  | DividerLabelProps;

function mergeClassName(className: string | undefined) {
  return className ? `brick-divider ${className}` : "brick-divider";
}

function DividerImpl(
  {
    asChild = false,
    children,
    className,
    inset = "none",
    labelAlign = "center",
    orientation = "horizontal",
    slot = "divider",
    stretch = false,
    thickness = "subtle",
    variant = "solid",
    ...props
  }: DividerProps,
  ref: ForwardedRef<DividerElement>,
) {
  const composed = asChild && isValidElement(children);
  const labeled = !composed && children !== undefined && children !== null;

  return (
    <AtomDivider.Root
      {...props}
      asChild={composed}
      className={mergeClassName(className)}
      data-inset={inset}
      data-label-align={labeled ? labelAlign : undefined}
      data-orientation={orientation}
      data-stretch={stretch ? "" : undefined}
      data-thickness={thickness}
      data-variant={variant}
      data-slot={slot}
      orientation={orientation}
      ref={ref}
    >
      {composed ? children : labeled ? (
        <>
          <span
            aria-hidden="true"
            className="brick-divider__line"
            data-slot="divider-line-start"
          />
          <span className="brick-divider__label" data-slot="divider-label">
            {children}
          </span>
          <span
            aria-hidden="true"
            className="brick-divider__line"
            data-slot="divider-line-end"
          />
        </>
      ) : undefined}
    </AtomDivider.Root>
  );
}

export const Divider = forwardRef<DividerElement, DividerProps>(DividerImpl);
Divider.displayName = "Divider";
