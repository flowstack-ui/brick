"use client";

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type ReactNode,
} from "react";
import {
  MultiSelect as AtomMultiSelect,
  type MultiSelectArrowProps as AtomMultiSelectArrowProps,
  type MultiSelectGroupProps as AtomMultiSelectGroupProps,
  type MultiSelectIconProps as AtomMultiSelectIconProps,
  type MultiSelectItemIndicatorProps as AtomMultiSelectItemIndicatorProps,
  type MultiSelectItemProps as AtomMultiSelectItemProps,
  type MultiSelectItemTextProps as AtomMultiSelectItemTextProps,
  type MultiSelectLabelProps as AtomMultiSelectLabelProps,
  type MultiSelectListboxProps as AtomMultiSelectListboxProps,
  type MultiSelectPortalProps as AtomMultiSelectPortalProps,
  type MultiSelectRootProps as AtomMultiSelectRootProps,
  type MultiSelectScrollDownButtonProps as AtomMultiSelectScrollDownButtonProps,
  type MultiSelectScrollUpButtonProps as AtomMultiSelectScrollUpButtonProps,
  type MultiSelectSeparatorProps as AtomMultiSelectSeparatorProps,
  type MultiSelectTriggerProps as AtomMultiSelectTriggerProps,
  type MultiSelectValueProps as AtomMultiSelectValueProps,
  type MultiSelectViewportProps as AtomMultiSelectViewportProps,
} from "@flowstack-ui/atom/multi-select";

export type MultiSelectVariant = "outline" | "soft" | "underline";
export type MultiSelectSize = "sm" | "md" | "lg";
export type MultiSelectShape = "sharp" | "rounded" | "pill";

type MultiSelectRootSharedProps = Omit<AtomMultiSelectRootProps, "children"> & {
  children: ReactNode;
  size?: MultiSelectSize;
  fullWidth?: boolean;
};

export type MultiSelectRootProps = MultiSelectRootSharedProps &
  (
    | { variant?: "outline" | "soft"; shape?: MultiSelectShape }
    | { variant: "underline"; shape?: never }
  );
export type MultiSelectTriggerProps = AtomMultiSelectTriggerProps;
export type MultiSelectValueProps = AtomMultiSelectValueProps;
export type MultiSelectIconProps = Omit<AtomMultiSelectIconProps, "children"> & { children?: ReactNode };
export type MultiSelectPortalProps = AtomMultiSelectPortalProps;
export type MultiSelectContentProps = AtomMultiSelectListboxProps;
export type MultiSelectListboxProps = MultiSelectContentProps;
export type MultiSelectViewportProps = AtomMultiSelectViewportProps;
export type MultiSelectScrollUpButtonProps = Omit<AtomMultiSelectScrollUpButtonProps, "children"> & { children?: ReactNode };
export type MultiSelectScrollDownButtonProps = Omit<AtomMultiSelectScrollDownButtonProps, "children"> & { children?: ReactNode };
export type MultiSelectGroupProps = AtomMultiSelectGroupProps;
export type MultiSelectLabelProps = AtomMultiSelectLabelProps;
export type MultiSelectItemProps = AtomMultiSelectItemProps;
export type MultiSelectItemTextProps = AtomMultiSelectItemTextProps;
export type MultiSelectItemIndicatorProps = Omit<AtomMultiSelectItemIndicatorProps, "children"> & { children?: ReactNode };
export type MultiSelectSeparatorProps = AtomMultiSelectSeparatorProps;
export type MultiSelectArrowProps = Omit<AtomMultiSelectArrowProps, "children"> & { children?: ReactNode };

interface MultiSelectVisualContextValue {
  variant: MultiSelectVariant;
  size: MultiSelectSize;
  shape?: MultiSelectShape;
  fullWidth: boolean;
}

const MultiSelectVisualContext = createContext<MultiSelectVisualContextValue>({
  variant: "outline",
  size: "md",
  shape: "rounded",
  fullWidth: true,
});

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

function DirectionArtwork({ direction }: { direction: "up" | "down" }) {
  return (
    <svg aria-hidden="true" className="brick-multi-select-direction-artwork" fill="none" viewBox="0 0 16 16">
      <path d={direction === "up" ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} />
    </svg>
  );
}

function CheckArtwork() {
  return (
    <svg aria-hidden="true" className="brick-multi-select-check-artwork" fill="none" viewBox="0 0 16 16">
      <path d="m3.5 8.25 2.75 2.75 6.25-6" />
    </svg>
  );
}

function multiSelectItemText(children: ReactNode): string | undefined {
  let label: string | undefined;
  Children.forEach(children, (child) => {
    if (label || !isValidElement<{ children?: ReactNode }>(child)) return;
    if (child.type === MultiSelectItemText) {
      const text = Children.toArray(child.props.children)
        .filter((part): part is string | number => typeof part === "string" || typeof part === "number")
        .join("")
        .trim();
      if (text) label = text;
      return;
    }
    label = multiSelectItemText(child.props.children);
  });
  return label;
}

function supplyStaticItemLabels(children: ReactNode): ReactNode {
  const mapped = Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode; label?: string }>(child)) return child;
    const nested = supplyStaticItemLabels(child.props.children);
    if (child.type === MultiSelectItem && child.props.label === undefined) {
      return cloneElement(child, { label: multiSelectItemText(child.props.children) }, nested);
    }
    return cloneElement(child, undefined, nested);
  });
  if (!mapped || mapped.length === 0) return undefined;
  return mapped.length === 1 ? mapped[0] : mapped;
}

export function MultiSelectRoot({
  children,
  fullWidth = true,
  shape = "rounded",
  size = "md",
  variant = "outline",
  ...props
}: MultiSelectRootProps) {
  const resolvedShape = variant === "underline" ? undefined : shape;
  return (
    <MultiSelectVisualContext.Provider value={{ fullWidth, shape: resolvedShape, size, variant }}>
      <AtomMultiSelect.Root {...props}>{supplyStaticItemLabels(children)}</AtomMultiSelect.Root>
    </MultiSelectVisualContext.Provider>
  );
}

export const MultiSelectTrigger = forwardRef<HTMLButtonElement, MultiSelectTriggerProps>(
  function MultiSelectTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    const visual = useContext(MultiSelectVisualContext);
    return (
      <AtomMultiSelect.Trigger
        {...props}
        className={mergeClassName("brick-multi-select-trigger", className)}
        data-full-width={visual.fullWidth ? "" : undefined}
        data-shape={visual.shape}
        data-size={visual.size}
        data-slot={slotOrDefault(dataSlot, "multi-select-trigger")}
        data-variant={visual.variant}
        ref={ref}
      />
    );
  },
);

export const MultiSelectValue = forwardRef<HTMLSpanElement, MultiSelectValueProps>(
  function MultiSelectValue({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.Value {...props} className={mergeClassName("brick-multi-select-value", className)} data-slot={slotOrDefault(dataSlot, "multi-select-value")} ref={ref} />;
  },
);

export const MultiSelectIcon = forwardRef<HTMLSpanElement, MultiSelectIconProps>(
  function MultiSelectIcon({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.Icon {...props} className={mergeClassName("brick-multi-select-icon", className)} data-slot={slotOrDefault(dataSlot, "multi-select-icon")} ref={ref}>{children ?? <DirectionArtwork direction="down" />}</AtomMultiSelect.Icon>;
  },
);

export const MultiSelectPortal = AtomMultiSelect.Portal;

export const MultiSelectContent = forwardRef<HTMLDivElement, MultiSelectContentProps>(
  function MultiSelectContent({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.Content {...props} className={mergeClassName("brick-multi-select-content", className)} data-slot={slotOrDefault(dataSlot, "multi-select-listbox")} ref={ref} />;
  },
);

export const MultiSelectListbox = MultiSelectContent;

export const MultiSelectViewport = forwardRef<HTMLDivElement, MultiSelectViewportProps>(
  function MultiSelectViewport({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.Viewport {...props} className={mergeClassName("brick-multi-select-viewport", className)} data-slot={slotOrDefault(dataSlot, "multi-select-viewport")} ref={ref} />;
  },
);

export const MultiSelectScrollUpButton = forwardRef<HTMLButtonElement, MultiSelectScrollUpButtonProps>(
  function MultiSelectScrollUpButton({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.ScrollUpButton {...props} className={mergeClassName("brick-multi-select-scroll-up", className)} data-slot={slotOrDefault(dataSlot, "multi-select-scroll-up-button")} ref={ref}>{children ?? <DirectionArtwork direction="up" />}</AtomMultiSelect.ScrollUpButton>;
  },
);

export const MultiSelectScrollDownButton = forwardRef<HTMLButtonElement, MultiSelectScrollDownButtonProps>(
  function MultiSelectScrollDownButton({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomMultiSelect.ScrollDownButton {...props} className={mergeClassName("brick-multi-select-scroll-down", className)} data-slot={slotOrDefault(dataSlot, "multi-select-scroll-down-button")} ref={ref}>{children ?? <DirectionArtwork direction="down" />}</AtomMultiSelect.ScrollDownButton>;
  },
);

export const MultiSelectGroup = forwardRef<HTMLDivElement, MultiSelectGroupProps>(function MultiSelectGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.Group {...props} className={mergeClassName("brick-multi-select-group", className)} data-slot={slotOrDefault(dataSlot, "multi-select-group")} ref={ref} />;
});

export const MultiSelectLabel = forwardRef<HTMLDivElement, MultiSelectLabelProps>(function MultiSelectLabel({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.Label {...props} className={mergeClassName("brick-multi-select-label", className)} data-slot={slotOrDefault(dataSlot, "multi-select-label")} ref={ref} />;
});

export const MultiSelectItem = forwardRef<HTMLDivElement, MultiSelectItemProps>(function MultiSelectItem({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.Item {...props} className={mergeClassName("brick-multi-select-item", className)} data-slot={slotOrDefault(dataSlot, "multi-select-item")} ref={ref} />;
});

export const MultiSelectItemText = forwardRef<HTMLSpanElement, MultiSelectItemTextProps>(function MultiSelectItemText({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.ItemText {...props} className={mergeClassName("brick-multi-select-item-text", className)} data-slot={slotOrDefault(dataSlot, "multi-select-item-text")} ref={ref} />;
});

export const MultiSelectItemIndicator = forwardRef<HTMLSpanElement, MultiSelectItemIndicatorProps>(function MultiSelectItemIndicator({ children, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.ItemIndicator {...props} className={mergeClassName("brick-multi-select-item-indicator", className)} data-slot={slotOrDefault(dataSlot, "multi-select-item-indicator")} ref={ref}>{children ?? <CheckArtwork />}</AtomMultiSelect.ItemIndicator>;
});

export const MultiSelectSeparator = forwardRef<HTMLDivElement, MultiSelectSeparatorProps>(function MultiSelectSeparator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.Separator {...props} className={mergeClassName("brick-multi-select-separator", className)} data-slot={slotOrDefault(dataSlot, "multi-select-separator")} ref={ref} />;
});

export const MultiSelectArrow = forwardRef<HTMLSpanElement, MultiSelectArrowProps>(function MultiSelectArrow({ children, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomMultiSelect.Arrow {...props} className={mergeClassName("brick-multi-select-arrow", className)} data-slot={slotOrDefault(dataSlot, "multi-select-arrow")} ref={ref}>{children ?? <span aria-hidden="true" className="brick-multi-select-arrow-artwork" />}</AtomMultiSelect.Arrow>;
});

MultiSelectTrigger.displayName = "MultiSelect.Trigger";
MultiSelectValue.displayName = "MultiSelect.Value";
MultiSelectIcon.displayName = "MultiSelect.Icon";
MultiSelectContent.displayName = "MultiSelect.Content";
MultiSelectViewport.displayName = "MultiSelect.Viewport";
MultiSelectScrollUpButton.displayName = "MultiSelect.ScrollUpButton";
MultiSelectScrollDownButton.displayName = "MultiSelect.ScrollDownButton";
MultiSelectGroup.displayName = "MultiSelect.Group";
MultiSelectLabel.displayName = "MultiSelect.Label";
MultiSelectItem.displayName = "MultiSelect.Item";
MultiSelectItemText.displayName = "MultiSelect.ItemText";
MultiSelectItemIndicator.displayName = "MultiSelect.ItemIndicator";
MultiSelectSeparator.displayName = "MultiSelect.Separator";
MultiSelectArrow.displayName = "MultiSelect.Arrow";

export const MultiSelect = Object.freeze({
  Root: MultiSelectRoot,
  Trigger: MultiSelectTrigger,
  Value: MultiSelectValue,
  Icon: MultiSelectIcon,
  Portal: MultiSelectPortal,
  Content: MultiSelectContent,
  Listbox: MultiSelectListbox,
  Viewport: MultiSelectViewport,
  ScrollUpButton: MultiSelectScrollUpButton,
  ScrollDownButton: MultiSelectScrollDownButton,
  Group: MultiSelectGroup,
  Label: MultiSelectLabel,
  Item: MultiSelectItem,
  ItemText: MultiSelectItemText,
  ItemIndicator: MultiSelectItemIndicator,
  Separator: MultiSelectSeparator,
  Arrow: MultiSelectArrow,
});
