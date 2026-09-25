"use client";

import {
  createContext,
  useContext,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type DataListSize = "sm" | "md" | "lg";
export type DataListVariant = "subtle" | "bold";
export type DataListOrientation = "vertical" | "horizontal";
export type DataListLabelWidth = "auto" | "sm" | "md" | "lg";

type RootNativeProps = Omit<
  HTMLAttributes<HTMLDListElement>,
  "children" | "className" | "style"
>;
type ItemNativeProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style"
>;
type TermNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

export interface DataListRootProps extends RootNativeProps {
  children?: ReactNode;
  className?: string;
  divide?: boolean;
  labelWidth?: ResponsiveValue<DataListLabelWidth>;
  orientation?: ResponsiveValue<DataListOrientation>;
  size?: ResponsiveValue<DataListSize>;
  variant?: ResponsiveValue<DataListVariant>;
  slot?: string;
  style?: CSSProperties;
}

export interface DataListItemProps extends ItemNativeProps {
  children?: ReactNode;
  className?: string;
  slot?: string;
  style?: CSSProperties;
}

export interface DataListLabelProps extends TermNativeProps {
  children?: ReactNode;
  className?: string;
  slot?: string;
  style?: CSSProperties;
}

export interface DataListValueProps extends TermNativeProps {
  children?: ReactNode;
  className?: string;
  slot?: string;
  style?: CSSProperties;
}

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export type DataListRecipeProps = Pick<
  DataListRootProps,
  "size" | "variant" | "orientation" | "labelWidth" | "divide"
>;
const RecipeContext = createContext<DataListRecipeProps>({});
export interface DataListPropsProviderProps {
  value: DataListRecipeProps;
  children?: ReactNode;
}
export function DataListPropsProvider({
  value,
  children,
}: DataListPropsProviderProps) {
  const parent = useContext(RecipeContext);
  return (
    <RecipeContext.Provider value={{ ...parent, ...value }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const DataListRoot = forwardRef<HTMLDListElement, DataListRootProps>(
  function DataListRoot(
    {
      children,
      className,
      divide,
      labelWidth,
      orientation,
      size,
      variant,
      slot = "data-list-root",
      ...props
    },
    ref,
  ) {
    const defaults = useContext(RecipeContext);
    return (
      <dl
        {...props}
        {...responsiveDataAttributes(
          "data-orientation",
          orientation ?? defaults.orientation ?? "vertical",
          {
            defaultValue: "vertical",
            alwaysInitial: true,
          },
        )}
        {...responsiveDataAttributes(
          "data-size",
          size ?? defaults.size ?? "md",
          { defaultValue: "md", alwaysInitial: true },
        )}
        {...responsiveDataAttributes(
          "data-variant",
          variant ?? defaults.variant ?? "subtle",
          { defaultValue: "subtle", alwaysInitial: true },
        )}
        {...responsiveDataAttributes(
          "data-label-width",
          labelWidth ?? defaults.labelWidth ?? "auto",
          { defaultValue: "auto", alwaysInitial: true },
        )}
        className={classes("brick-data-list", className)}
        data-divide={(divide ?? defaults.divide ?? false) ? "" : undefined}
        data-slot={slot}
        ref={ref}
      >
        {children}
      </dl>
    );
  },
);

export const DataListItem = forwardRef<HTMLDivElement, DataListItemProps>(
  function DataListItem(
    { children, className, slot = "data-list-item", ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        className={classes("brick-data-list__item", className)}
        data-slot={slot}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export const DataListLabel = forwardRef<HTMLElement, DataListLabelProps>(
  function DataListLabel(
    { children, className, slot = "data-list-label", ...props },
    ref,
  ) {
    return (
      <dt
        {...props}
        className={classes("brick-data-list__label", className)}
        data-slot={slot}
        ref={ref}
      >
        {children}
      </dt>
    );
  },
);

export const DataListValue = forwardRef<HTMLElement, DataListValueProps>(
  function DataListValue(
    { children, className, slot = "data-list-value", ...props },
    ref,
  ) {
    return (
      <dd
        {...props}
        className={classes("brick-data-list__value", className)}
        data-slot={slot}
        ref={ref}
      >
        {children}
      </dd>
    );
  },
);

DataListRoot.displayName = "DataList.Root";
DataListItem.displayName = "DataList.Item";
DataListLabel.displayName = "DataList.Label";
DataListValue.displayName = "DataList.Value";

export const DataList = Object.freeze({
  PropsProvider: DataListPropsProvider,
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});
