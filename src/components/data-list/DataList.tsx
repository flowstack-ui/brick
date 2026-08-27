import {
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
  labelWidth?: DataListLabelWidth;
  orientation?: ResponsiveValue<DataListOrientation>;
  size?: DataListSize;
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

export const DataListRoot = forwardRef<HTMLDListElement, DataListRootProps>(
  function DataListRoot(
    {
      children,
      className,
      divide = false,
      labelWidth = "auto",
      orientation = "vertical",
      size = "md",
      slot = "data-list-root",
      ...props
    },
    ref,
  ) {
    return (
      <dl
        {...props}
        {...responsiveDataAttributes("data-orientation", orientation, {
          alwaysInitial: true,
        })}
        className={classes("brick-data-list", className)}
        data-divide={divide ? "" : undefined}
        data-label-width={labelWidth}
        data-size={size}
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
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});
