import {
  Children,
  Fragment,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  normalizeResponsiveValue,
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";
import { stackHost } from "../stack/stack-host.js";

export type { ResponsiveValue };
export type { SpacingValue };

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

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridLine = number | string;
export type GridSpan = number | "auto";
export type GridTrack = string;
export type GridAutoFlow =
  | "row"
  | "column"
  | "dense"
  | "row dense"
  | "column dense";
export type GridContentAlignment =
  | "normal"
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type GridColumnSpan = GridSpan | "full";
export type GridGap = SpacingValue;
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
  asChild?: boolean;
  children?: ReactNode;
  gap?: ResponsiveValue<GridGap>;
  rowGap?: ResponsiveValue<GridGap>;
  columnGap?: ResponsiveValue<GridGap>;
  align?: ResponsiveValue<GridAlign>;
  justify?: ResponsiveValue<GridJustify>;
  templateRows?: ResponsiveValue<GridTrack>;
  templateAreas?: ResponsiveValue<string>;
  autoColumns?: ResponsiveValue<GridTrack>;
  autoRows?: ResponsiveValue<GridTrack>;
  autoFlow?: ResponsiveValue<GridAutoFlow>;
  alignContent?: ResponsiveValue<GridContentAlignment>;
  justifyContent?: ResponsiveValue<GridContentAlignment>;
  inline?: ResponsiveValue<boolean>;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

type ExplicitGridProps = {
  columns?: ResponsiveValue<GridColumns>;
  minItemSize?: never;
  templateColumns?: never;
};

type IntrinsicGridProps = {
  columns?: never;
  minItemSize: GridMinItemSize;
  templateColumns?: never;
};

export type GridRootProps = Omit<
  GridRootBaseProps,
  "as" | "asChild" | "children"
> &
  (
    | { as?: GridRootElement; asChild?: false; children?: ReactNode }
    | {
        as?: never;
        asChild: true;
        children: ReactElement;
      }
  ) &
  (
    | ExplicitGridProps
    | IntrinsicGridProps
    | {
        columns?: never;
        minItemSize?: never;
        templateColumns: ResponsiveValue<GridTrack>;
      }
  );

type GridItemNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

type ResponsiveObject<T> = Extract<ResponsiveValue<T>, object>;

type GridItemColumnPlacement =
  | {
      columnSpan?: GridSpan;
      columnStart?: ResponsiveValue<GridLine>;
      columnEnd?: never;
    }
  | {
      columnSpan: ResponsiveObject<GridSpan>;
      columnStart?: ResponsiveValue<GridLine>;
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
      columnStart?: ResponsiveValue<GridLine>;
      columnEnd: ResponsiveValue<GridLine>;
    }
  | {
      columnSpan: ResponsiveValue<GridSpan>;
      columnStart?: never;
      columnEnd: ResponsiveValue<GridLine>;
    };

type GridItemRowPlacement =
  | {
      rowSpan?: GridSpan;
      rowStart?: ResponsiveValue<GridLine>;
      rowEnd?: never;
    }
  | {
      rowSpan: ResponsiveObject<GridSpan>;
      rowStart?: ResponsiveValue<GridLine>;
      rowEnd?: never;
    }
  | {
      rowSpan?: never;
      rowStart?: ResponsiveValue<GridLine>;
      rowEnd: ResponsiveValue<GridLine>;
    }
  | {
      rowSpan: ResponsiveValue<GridSpan>;
      rowStart?: never;
      rowEnd: ResponsiveValue<GridLine>;
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
      children: ReactElement;
    };

export type GridItemProps = GridItemNativeProps &
  (
    | (GridItemColumnPlacement & GridItemRowPlacement & { area?: never })
    | {
        area: ResponsiveValue<string>;
        columnSpan?: never;
        columnStart?: never;
        columnEnd?: never;
        rowSpan?: never;
        rowStart?: never;
        rowEnd?: never;
      }
  ) &
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

const gridBreakpoints = ["initial", "sm", "md", "lg", "xl"] as const;
function gridStyles(name: string, value: ResponsiveValue<string> | undefined) {
  if (value === undefined) return {};
  return Object.fromEntries(
    Object.entries(normalizeResponsiveValue(value))
      .filter(
        ([key, next]) =>
          gridBreakpoints.includes(key as (typeof gridBreakpoints)[number]) &&
          typeof next === "string" &&
          next.trim(),
      )
      .map(([key, next]) => [`--brick-grid-${name}-${key}-input`, next]),
  );
}

function placementStyles(
  axis: "column" | "row",
  span?: ResponsiveValue<GridColumnSpan>,
  start?: ResponsiveValue<GridLine>,
  end?: ResponsiveValue<GridLine>,
) {
  if (span === undefined && start === undefined && end === undefined) return {};
  const values: Array<
    Partial<Record<(typeof gridBreakpoints)[number], string | number>>
  > = [span, start, end].map((value) =>
    value === undefined ? {} : normalizeResponsiveValue(value),
  );
  const current: Array<string | number | undefined> = [];
  const starts: Record<string, string> = {},
    ends: Record<string, string> = {};
  for (const key of gridBreakpoints) {
    values.forEach((value, index) => {
      if (value[key] !== undefined) current[index] = value[key];
    });
    const [count, from, to] = current;
    const spanValue =
      typeof count === "number" && Number.isInteger(count) && count > 0
        ? `span ${count}`
        : "auto";
    starts[key] =
      count === "full"
        ? "1"
        : String(from ?? (to !== undefined ? spanValue : "auto"));
    ends[key] = count === "full" ? "-1" : String(to ?? spanValue);
  }
  return {
    ...gridStyles(`placement-${axis}-start`, starts as ResponsiveValue<string>),
    ...gridStyles(`placement-${axis}-end`, ends as ResponsiveValue<string>),
  };
}

function GridRootImpl(
  {
    as = "div",
    asChild = false,
    columns = 1,
    minItemSize,
    templateColumns,
    templateRows,
    templateAreas,
    autoColumns,
    autoRows,
    autoFlow,
    alignContent,
    justifyContent,
    inline,
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
  const mode =
    templateColumns !== undefined
      ? "template"
      : minItemSize === undefined
        ? "explicit"
        : "intrinsic";
  const columnAttributes =
    mode === "explicit"
      ? responsiveDataAttributes("data-columns", columns, {
          alwaysInitial: true,
        })
      : {};
  const rowGapAttributes =
    rowGap === undefined
      ? {}
      : responsiveDataAttributes("data-row-gap", rowGap, {
          alwaysInitial: true,
        });
  const columnGapAttributes =
    columnGap === undefined
      ? {}
      : responsiveDataAttributes("data-column-gap", columnGap, {
          alwaysInitial: true,
        });
  const rootProps = {
    ...props,
    ...columnAttributes,
    ...responsiveDataAttributes("data-gap", gap, { alwaysInitial: true }),
    ...rowGapAttributes,
    ...columnGapAttributes,
    ...responsiveDataAttributes("data-align", align, {
      defaultValue: "stretch",
    }),
    ...responsiveDataAttributes("data-justify", justify, {
      defaultValue: "stretch",
    }),
    className: mergeClassName("brick-grid", className),
    "data-min-item-size": minItemSize,
    "data-mode": mode,
    "data-grid-template": templateColumns !== undefined ? "" : undefined,
    "data-slot": slot,
    ref,
    style: {
      ...gridStyles("template-columns", templateColumns),
      ...gridStyles("template-rows", templateRows),
      ...gridStyles("template-areas", templateAreas),
      ...gridStyles("auto-columns", autoColumns),
      ...gridStyles("auto-rows", autoRows),
      ...gridStyles("auto-flow", autoFlow),
      ...gridStyles("align-content", alignContent),
      ...gridStyles("justify-content", justifyContent),
      ...gridStyles(
        "display",
        inline === undefined
          ? undefined
          : (Object.fromEntries(
              Object.entries(normalizeResponsiveValue(inline)).map(
                ([key, value]) => [key, value ? "inline-grid" : "grid"],
              ),
            ) as ResponsiveValue<string>),
      ),
      ...responsiveSpacingStyles("--brick-grid-gap", gap),
      ...(rowGap === undefined
        ? {}
        : responsiveSpacingStyles("--brick-grid-row-gap", rowGap)),
      ...(columnGap === undefined
        ? {}
        : responsiveSpacingStyles("--brick-grid-column-gap", columnGap)),
      ...style,
    },
  };
  if (asChild) {
    const child = Children.only(children) as ReactElement<
      Record<string, unknown>
    >;
    if (child.type === Fragment)
      throw new Error("Grid.Root asChild requires one non-Fragment host.");
    return stackHost(child, rootProps, ref);
  }
  return createElement(as, rootProps, children);
}

function GridItemImpl(
  {
    as = "div",
    asChild = false,
    area,
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
  const columnSpanAttributes =
    columnSpan === undefined
      ? {}
      : responsiveDataAttributes("data-column-span", columnSpan, {
          alwaysInitial: true,
        });
  const rowSpanAttributes =
    rowSpan === undefined
      ? {}
      : responsiveDataAttributes("data-row-span", rowSpan, {
          alwaysInitial: true,
        });
  const itemProps = {
    ...props,
    ...columnSpanAttributes,
    ...rowSpanAttributes,
    ...responsiveDataAttributes("data-align", align, { defaultValue: "auto" }),
    ...responsiveDataAttributes("data-justify", justify, {
      defaultValue: "auto",
    }),
    className: mergeClassName("brick-grid-item", className),
    ...(columnEnd === undefined
      ? {}
      : responsiveDataAttributes("data-column-end", columnEnd)),
    ...(columnStart === undefined
      ? {}
      : responsiveDataAttributes("data-column-start", columnStart)),
    ...(rowEnd === undefined
      ? {}
      : responsiveDataAttributes("data-row-end", rowEnd)),
    ...(rowStart === undefined
      ? {}
      : responsiveDataAttributes("data-row-start", rowStart)),
    "data-grid-area": area !== undefined ? "" : undefined,
    "data-slot": slot,
    ref,
    style: {
      ...placementStyles("column", columnSpan, columnStart, columnEnd),
      ...placementStyles("row", rowSpan, rowStart, rowEnd),
      ...gridStyles("item-area", area),
      ...style,
    },
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<
      Record<string, unknown>
    >;
    if (child.type === Fragment)
      throw new Error("Grid.Item asChild requires one non-Fragment host.");
    return stackHost(child, itemProps, ref);
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
