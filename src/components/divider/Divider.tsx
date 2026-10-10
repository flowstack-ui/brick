import {
  forwardRef,
  isValidElement,
  type CSSProperties,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  DividerRoot as AtomDividerRoot,
  type DividerRootProps,
} from "@flowstack-ui/atom/divider";
import {
  normalizeResponsiveValue,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerThickness =
  | "hairline"
  | "subtle"
  | "regular"
  | "bold"
  | "strong";
export type DividerInset = "none" | "start" | "both";
export type DividerLabelAlign = "start" | "center" | "end";
export type DividerElement = HTMLHRElement | HTMLDivElement;

type DividerSharedProps = Omit<
  DividerRootProps,
  "asChild" | "children" | "className" | "orientation" | "style" | "decorative"
> & {
  variant?: DividerVariant;
  thickness?: DividerThickness;
  inset?: DividerInset;
  stretch?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

type DividerDirectionProps =
  | { decorative?: true; orientation?: ResponsiveValue<DividerOrientation> }
  | { decorative: false; orientation?: DividerOrientation };
export type DividerLineProps = DividerSharedProps &
  DividerDirectionProps & {
    children?: never;
    labelAlign?: never;
    asChild?: false;
  };

export type DividerComposedProps = DividerSharedProps &
  DividerDirectionProps & {
    asChild: true;
    children: ReactElement;
    labelAlign?: never;
  };

export interface DividerLabelProps extends DividerSharedProps {
  decorative?: boolean;
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
    decorative = true,
    ...props
  }: DividerProps,
  ref: ForwardedRef<DividerElement>,
) {
  const composed = asChild && isValidElement(children);
  const labeled = !composed && children !== undefined && children !== null;
  const responsive = typeof orientation === "object";
  const values = normalizeResponsiveValue(orientation);
  const baseOrientation = values.initial ?? "horizontal";
  let effective = baseOrientation;
  const orientationAttributes = Object.fromEntries(
    (["initial", "sm", "md", "lg", "xl"] as const).map((key) => {
      effective = values[key] ?? effective;
      return [
        key === "initial" ? "data-orientation" : `data-orientation-${key}`,
        effective,
      ];
    }),
  );
  if (responsive && !decorative)
    console.warn(
      "Responsive Divider orientation is decorative; use a scalar orientation for a semantic separator.",
    );

  return (
    <AtomDividerRoot
      {...props}
      asChild={composed}
      className={mergeClassName(className)}
      data-inset={inset}
      data-label-align={labeled ? labelAlign : undefined}
      {...orientationAttributes}
      data-orientation={baseOrientation}
      data-stretch={stretch ? "" : undefined}
      data-thickness={thickness}
      data-variant={variant}
      data-slot={slot}
      orientation={baseOrientation}
      decorative={responsive ? true : decorative}
      ref={ref}
    >
      {composed ? (
        children
      ) : labeled ? (
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
    </AtomDividerRoot>
  );
}

export const Divider = forwardRef<DividerElement, DividerProps>(DividerImpl);
Divider.displayName = "Divider";
