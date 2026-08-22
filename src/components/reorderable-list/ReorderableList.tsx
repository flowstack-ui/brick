import { forwardRef, type HTMLAttributes } from "react";
import {
  Reorder as AtomReorder,
  type ReorderDropIndicatorProps as AtomReorderDropIndicatorProps,
  type ReorderHandleProps as AtomReorderHandleProps,
  type ReorderItemProps as AtomReorderItemProps,
  type ReorderNamedMoveProps as AtomReorderNamedMoveProps,
  type ReorderRootProps as AtomReorderRootProps,
} from "@flowstack-ui/atom/reorder";

export type ReorderableListSize = "sm" | "md" | "lg";
export type ReorderableListVariant = "outline" | "soft";

export interface ReorderableListRootProps extends AtomReorderRootProps {
  /** Item and control scale. @default "md" */
  size?: ReorderableListSize;
  /** Item surface recipe. @default "outline" */
  variant?: ReorderableListVariant;
}

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
    { className, size = "md", variant = "outline", "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomReorder.Root
        {...props}
        className={mergeClassName("brick-reorderable-list", className)}
        data-size={size}
        data-slot={dataSlot ?? "reorderable-list"}
        data-variant={variant}
        ref={ref}
      />
    );
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
});
