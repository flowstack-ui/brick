import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type { ResponsiveValue };

export type GridRootElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "nav"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "ul"
  | "ol"
  | "li";

export type GridItemElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "li";

export type GridColumns =
  | 1 | 2 | 3 | 4 | 5 | 6
  | 7 | 8 | 9 | 10 | 11 | 12;
export type GridLine =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7
  | 8 | 9 | 10 | 11 | 12 | 13;
export type GridSpan =
  | 1 | 2 | 3 | 4 | 5 | 6
  | 7 | 8 | 9 | 10 | 11 | 12;
export type GridColumnSpan = GridSpan | "full";
export type GridGap = "0" | "1" | "2" | "3" | "4" | "5" | "6";
export type GridMinItemSize = "xs" | "sm" | "md" | "lg" | "xl";
export type GridAlign = "stretch" | "start" | "center" | "end" | "baseline";
export type GridJustify = "stretch" | "start" | "center" | "end";
export type GridSelfAlign = "auto" | GridAlign;
export type GridSelfJustify = "auto" | GridJustify;

type GridRootNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

interface GridRootBaseProps extends GridRootNativeProps {
  as?: GridRootElement;
  children?: ReactNode;
  gap?: ResponsiveValue<GridGap>;
  rowGap?: ResponsiveValue<GridGap>;
  columnGap?: ResponsiveValue<GridGap>;
  align?: ResponsiveValue<GridAlign>;
  justify?: ResponsiveValue<GridJustify>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

type ExplicitGridProps = {
  columns?: ResponsiveValue<GridColumns>;
  minItemSize?: never;
};

type IntrinsicGridProps = {
  columns?: never;
  minItemSize: GridMinItemSize;
};

export type GridRootProps =
  GridRootBaseProps & (ExplicitGridProps | IntrinsicGridProps);

type GridItemNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

type ResponsiveObject<T> = Extract<ResponsiveValue<T>, object>;

type GridItemColumnPlacement =
  | {
      columnSpan?: GridSpan;
      columnStart?: GridLine;
      columnEnd?: never;
    }
  | {
      columnSpan: ResponsiveObject<GridColumnSpan>;
      columnStart?: never;
      columnEnd?: never;
    }
  | {
      columnSpan: "full";
      columnStart?: never;
      columnEnd?: never;
    }
  | {
      columnSpan?: never;
      columnStart?: GridLine;
      columnEnd: GridLine;
    };

type GridItemRowPlacement =
  | {
      rowSpan?: GridSpan;
      rowStart?: GridLine;
      rowEnd?: never;
    }
  | {
      rowSpan: ResponsiveObject<GridSpan>;
      rowStart?: never;
      rowEnd?: never;
    }
  | {
      rowSpan?: never;
      rowStart?: GridLine;
      rowEnd: GridLine;
    };

type GridItemHostProps =
  | {
      as?: GridItemElement;
      asChild?: false;
      children?: ReactNode;
    }
  | {
      as?: never;
      asChild: true;
      children: ReactElement<Record<string, unknown>>;
    };

export type GridItemProps =
  GridItemNativeProps &
  GridItemColumnPlacement &
  GridItemRowPlacement &
  GridItemHostProps & {
    align?: ResponsiveValue<GridSelfAlign>;
    justify?: ResponsiveValue<GridSelfJustify>;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  };
}

function mergeComposedProps(
  original: Record<string, unknown>,
  override: Record<string, unknown>,
) {
  const merged = { ...original, ...override };

  for (const [key, value] of Object.entries(override)) {
    const current = original[key];
    if (
      key.startsWith("on") &&
      typeof current === "function" &&
      typeof value === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        value(...args);
        current(...args);
      };
    } else if (
      key === "className" &&
      typeof current === "string" &&
      typeof value === "string"
    ) {
      merged[key] = `${current} ${value}`;
    } else if (
      key === "style" &&
      current &&
      value &&
      typeof current === "object" &&
      typeof value === "object"
    ) {
      merged[key] = { ...current, ...value };
    }
  }

  return merged;
}

function GridRootImpl(
  {
    as = "div",
    columns = 1,
    minItemSize,
    gap = "0",
    rowGap,
    columnGap,
    align = "stretch",
    justify = "stretch",
    className,
    slot = "grid",
    style,
    children,
    ...props
  }: GridRootProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const mode = minItemSize === undefined ? "explicit" : "intrinsic";
  const columnAttributes = mode === "explicit"
    ? responsiveDataAttributes("data-columns", columns, { alwaysInitial: true })
    : {};
  const rowGapAttributes = rowGap === undefined
    ? {}
    : responsiveDataAttributes("data-row-gap", rowGap, { alwaysInitial: true });
  const columnGapAttributes = columnGap === undefined
    ? {}
    : responsiveDataAttributes("data-column-gap", columnGap, { alwaysInitial: true });
  return createElement(
    as,
    {
      ...props,
      ...columnAttributes,
      ...responsiveDataAttributes("data-gap", gap, { alwaysInitial: true }),
      ...rowGapAttributes,
      ...columnGapAttributes,
      ...responsiveDataAttributes("data-align", align, { defaultValue: "stretch" }),
      ...responsiveDataAttributes("data-justify", justify, { defaultValue: "stretch" }),
      className: mergeClassName("brick-grid", className),
      "data-min-item-size": minItemSize,
      "data-mode": mode,
      "data-slot": slot,
      ref,
      style,
    },
    children,
  );
}

function GridItemImpl(
  {
    as = "div",
    asChild = false,
    columnSpan,
    columnStart,
    columnEnd,
    rowSpan,
    rowStart,
    rowEnd,
    align = "auto",
    justify = "auto",
    className,
    slot = "grid-item",
    style,
    children,
    ...props
  }: GridItemProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const columnSpanAttributes = columnSpan === undefined
    ? {}
    : responsiveDataAttributes("data-column-span", columnSpan, { alwaysInitial: true });
  const rowSpanAttributes = rowSpan === undefined
    ? {}
    : responsiveDataAttributes("data-row-span", rowSpan, { alwaysInitial: true });
  const itemProps = {
    ...props,
    ...columnSpanAttributes,
    ...rowSpanAttributes,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "auto" }),
    ...responsiveDataAttributes("data-justify", justify, { defaultValue: "auto" }),
    className: mergeClassName("brick-grid-item", className),
    "data-column-end": columnEnd,
    "data-column-start": columnStart,
    "data-row-end": rowEnd,
    "data-row-start": rowStart,
    "data-slot": slot,
    ref,
    style,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    const childRef = child.props.ref as Ref<HTMLElement> | undefined;
    const composedRef = childRef || ref ? composeRefs(childRef, ref) : undefined;
    return cloneElement(
      child,
      mergeComposedProps(child.props, {
        ...itemProps,
        ref: composedRef,
      }),
    );
  }

  return createElement(as, itemProps, children);
}

const GridRoot = forwardRef<HTMLElement, GridRootProps>(GridRootImpl);
GridRoot.displayName = "Grid.Root";

const GridItem = forwardRef<HTMLElement, GridItemProps>(GridItemImpl);
GridItem.displayName = "Grid.Item";

export const Grid = Object.freeze({
  Root: GridRoot,
  Item: GridItem,
});
