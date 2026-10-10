import { createContext, forwardRef, useContext, type HTMLAttributes } from "react";
import {
  Reorder as AtomReorder,
  useReorderContext,
  type ReorderDropIndicatorProps as AtomReorderDropIndicatorProps,
  type ReorderHandleProps as AtomReorderHandleProps,
  type ReorderItemProps as AtomReorderItemProps,
  type ReorderNamedMoveProps as AtomReorderNamedMoveProps,
  type ReorderRootProps as AtomReorderRootProps,
  type ReorderPreviewProps as AtomReorderPreviewProps,
} from "@flowstack-ui/atom/reorder";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type ReorderableListSize = "sm" | "md" | "lg";
export type ReorderableListVariant = "outline" | "surface" | "soft";

export interface ReorderableListRootProps extends AtomReorderRootProps {
  /** Item and control scale. @default "md" */
  size?: ResponsiveValue<ReorderableListSize>;
  /** Item surface recipe. @default "outline" */
  variant?: ResponsiveValue<ReorderableListVariant>;
  radius?: Radius;
  /** Animate item displacement. Reduced motion always takes precedence. */
  motion?: boolean;
}
type Recipe = Pick<ReorderableListRootProps, "size" | "variant" | "radius">;
const RecipeContext = createContext<Recipe>({});
export interface ReorderableListPreviewProps extends AtomReorderPreviewProps {}

export interface ReorderableListItemProps extends AtomReorderItemProps {}

export type ReorderableListHandleProps = Omit<AtomReorderHandleProps, "aria-label"> & {
  /** Localized name for the drag handle. */
  "aria-label": string;
};

export type ReorderableListMoveProps = Omit<AtomReorderNamedMoveProps, "aria-label"> & {
  /** Localized name for the direct movement control. */
  "aria-label": string;
};

export interface ReorderableListDropIndicatorProps extends AtomReorderDropIndicatorProps {}

type SlottedProps<T> = T & { "data-slot"?: string };
export type ReorderableListContentProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export type ReorderableListActionsProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const ReorderableListRoot = forwardRef<HTMLOListElement, ReorderableListRootProps>(
  function ReorderableListRoot(
    { className, size = "md", variant = "outline", radius, motion = true, style, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <RecipeContext.Provider value={{ size, variant, radius }}><AtomReorder.Root
        {...props}
        className={mergeClassName("brick-reorderable-list", className)}
        {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
        data-slot={dataSlot ?? "reorderable-list"}
        {...responsiveDataAttributes("data-variant", variant, { defaultValue: "outline", alwaysInitial: true })}
        data-motion={motion ? "true" : "false"}
        style={radiusStyle(radius, "--brick-reorderable-list-item-radius", style)}
        ref={ref}
      /></RecipeContext.Provider>
    );
  },
);

function DefaultPreviewContent({ value }: { value: string }) {
  const { getItemLabel } = useReorderContext();
  return <div className="brick-reorderable-list__preview-content">
    <span className="brick-reorderable-list__handle" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
        <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
      </svg>
    </span>
    <span className="brick-reorderable-list__content">{getItemLabel(value)}</span>
  </div>;
}

export const ReorderableListPreview = forwardRef<HTMLDivElement, ReorderableListPreviewProps>(
  function ReorderableListPreview({ children, className, style, "data-slot": slot = "reorderable-list-preview", ...props }, ref) {
    const { size = "md", variant = "outline", radius } = useContext(RecipeContext);
    return <AtomReorder.Preview {...props} ref={ref}
      className={mergeClassName("brick-reorderable-list brick-reorderable-list__preview", className)}
      {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
      {...responsiveDataAttributes("data-variant", variant, { defaultValue: "outline", alwaysInitial: true })}
      data-slot={slot} style={radiusStyle(radius, "--brick-reorderable-list-item-radius", style)}>
      {children === undefined ? (value => <DefaultPreviewContent value={value} />) : children}
    </AtomReorder.Preview>;
  },
);

export const ReorderableListItem = forwardRef<HTMLLIElement, ReorderableListItemProps>(
  function ReorderableListItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomReorder.Item
        {...props}
        className={mergeClassName("brick-reorderable-list__item", className)}
        data-slot={dataSlot ?? "reorderable-list-item"}
        ref={ref}
      />
    );
  },
);

export const ReorderableListHandle = forwardRef<HTMLElement, ReorderableListHandleProps>(
  function ReorderableListHandle({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomReorder.Handle
        {...props}
        className={mergeClassName("brick-reorderable-list__handle", className)}
        data-slot={dataSlot ?? "reorderable-list-handle"}
        ref={ref}
      />
    );
  },
);

export const ReorderableListContent = forwardRef<HTMLDivElement, ReorderableListContentProps>(
  function ReorderableListContent({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-reorderable-list__content", className)}
        data-slot={dataSlot ?? "reorderable-list-content"}
        ref={ref}
      />
    );
  },
);

export const ReorderableListActions = forwardRef<HTMLDivElement, ReorderableListActionsProps>(
  function ReorderableListActions({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-reorderable-list__actions", className)}
        data-slot={dataSlot ?? "reorderable-list-actions"}
        ref={ref}
      />
    );
  },
);

function createMovePart(
  Part: typeof AtomReorder.MoveBefore,
  className: string,
  slot: string,
  displayName: string,
) {
  const Component = forwardRef<HTMLElement, ReorderableListMoveProps>(
    function ReorderableListMove({ className: consumerClassName, "data-slot": dataSlot, ...props }, ref) {
      return (
        <Part
          {...props}
          className={mergeClassName(`brick-reorderable-list__move ${className}`, consumerClassName)}
          data-slot={dataSlot ?? slot}
          ref={ref}
        />
      );
    },
  );
  Component.displayName = displayName;
  return Component;
}

export const ReorderableListMoveBefore = createMovePart(
  AtomReorder.MoveBefore,
  "brick-reorderable-list__move--before",
  "reorderable-list-move-before",
  "ReorderableList.MoveBefore",
);
export const ReorderableListMoveAfter = createMovePart(
  AtomReorder.MoveAfter,
  "brick-reorderable-list__move--after",
  "reorderable-list-move-after",
  "ReorderableList.MoveAfter",
);
export const ReorderableListMoveToStart = createMovePart(
  AtomReorder.MoveToStart,
  "brick-reorderable-list__move--start",
  "reorderable-list-move-to-start",
  "ReorderableList.MoveToStart",
);
export const ReorderableListMoveToEnd = createMovePart(
  AtomReorder.MoveToEnd,
  "brick-reorderable-list__move--end",
  "reorderable-list-move-to-end",
  "ReorderableList.MoveToEnd",
);

export const ReorderableListDropIndicator = forwardRef<
  HTMLSpanElement,
  ReorderableListDropIndicatorProps
>(function ReorderableListDropIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
  return (
    <AtomReorder.DropIndicator
      {...props}
      className={mergeClassName("brick-reorderable-list__drop-indicator", className)}
      data-slot={dataSlot ?? "reorderable-list-drop-indicator"}
      ref={ref}
    />
  );
});

ReorderableListRoot.displayName = "ReorderableList.Root";
ReorderableListItem.displayName = "ReorderableList.Item";
ReorderableListHandle.displayName = "ReorderableList.Handle";
ReorderableListContent.displayName = "ReorderableList.Content";
ReorderableListActions.displayName = "ReorderableList.Actions";
ReorderableListDropIndicator.displayName = "ReorderableList.DropIndicator";

export const ReorderableList = Object.freeze({
  Root: ReorderableListRoot,
  Item: ReorderableListItem,
  Handle: ReorderableListHandle,
  Content: ReorderableListContent,
  Actions: ReorderableListActions,
  MoveBefore: ReorderableListMoveBefore,
  MoveAfter: ReorderableListMoveAfter,
  MoveToStart: ReorderableListMoveToStart,
  MoveToEnd: ReorderableListMoveToEnd,
  DropIndicator: ReorderableListDropIndicator,
  Preview: ReorderableListPreview,
});
