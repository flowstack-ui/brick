import { forwardRef } from "react";
import {
  ToggleGroup as AtomToggleGroup,
  type ToggleGroupItemRootProps as AtomToggleGroupItemRootProps,
  type ToggleGroupRootProps as AtomToggleGroupRootProps,
} from "@flowstack-ui/atom/toggle-group";
import type {
  ToggleShape,
  ToggleSize,
  ToggleVariant,
} from "../toggle/Toggle.js";

type ToggleGroupRootCommonProps = Omit<
  AtomToggleGroupRootProps,
  "color" | "defaultValue" | "onValueChange" | "type" | "value"
> & {
  /** Shared item visual treatment. @default "soft" */
  variant?: ToggleVariant;
  /** Shared item size. @default "md" */
  size?: ToggleSize;
  /** Shared item and outer group geometry. @default "rounded" */
  shape?: ToggleShape;
  /** Join items into one segmented surface. @default false */
  attached?: boolean;
  /** Fill the available inline width and distribute items. @default false */
  fullWidth?: boolean;
};

export type ToggleGroupSingleProps = ToggleGroupRootCommonProps & {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type ToggleGroupMultipleProps = ToggleGroupRootCommonProps & {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ToggleGroupRootProps =
  | ToggleGroupSingleProps
  | ToggleGroupMultipleProps;

type AtomValueChange = AtomToggleGroupRootProps["onValueChange"];

export type ToggleGroupItemProps = Omit<
  AtomToggleGroupItemRootProps,
  "color"
> & {
  /** Use square padding for icon-only content. @default false */
  iconOnly?: boolean;
};

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const ToggleGroupRoot = forwardRef<
  HTMLDivElement,
  ToggleGroupRootProps
>(function ToggleGroupRoot(props, ref) {
  const {
    variant = "soft",
    size = "md",
    shape = "rounded",
    attached = false,
    fullWidth = false,
    className,
    ...behaviorProps
  } = props;

  const visualProps = {
    className: mergeClassName("brick-toggle-group", className),
    "data-attached": String(attached),
    "data-full-width": fullWidth ? "" : undefined,
    "data-shape": shape,
    "data-size": size,
    "data-variant": variant,
    ref,
  } as const;

  if (behaviorProps.type === "multiple") {
    const { onValueChange, ...multipleProps } = behaviorProps;
    return (
      <AtomToggleGroup.Root
        {...multipleProps}
        {...visualProps}
        onValueChange={onValueChange as AtomValueChange}
        type="multiple"
      />
    );
  }

  const { onValueChange, ...singleProps } = behaviorProps;
  return (
    <AtomToggleGroup.Root
      {...singleProps}
      {...visualProps}
      onValueChange={onValueChange as AtomValueChange}
      type="single"
    />
  );
});

export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { iconOnly = false, className, ...props },
  ref,
) {
  return (
    <AtomToggleGroup.Item
      {...props}
      className={mergeClassName("brick-toggle-group-item", className)}
      data-icon-only={iconOnly ? "" : undefined}
      ref={ref}
    />
  );
});

ToggleGroupRoot.displayName = "ToggleGroup.Root";
ToggleGroupItem.displayName = "ToggleGroup.Item";

export const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
} as const;
