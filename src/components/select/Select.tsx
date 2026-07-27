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
  Select as AtomSelect,
  type SelectArrowProps as AtomSelectArrowProps,
  type SelectGroupProps as AtomSelectGroupProps,
  type SelectIconProps as AtomSelectIconProps,
  type SelectItemIndicatorProps as AtomSelectItemIndicatorProps,
  type SelectItemProps as AtomSelectItemProps,
  type SelectItemTextProps as AtomSelectItemTextProps,
  type SelectLabelProps as AtomSelectLabelProps,
  type SelectListboxProps as AtomSelectListboxProps,
  type SelectPortalProps as AtomSelectPortalProps,
  type SelectRootProps as AtomSelectRootProps,
  type SelectScrollDownButtonProps as AtomSelectScrollDownButtonProps,
  type SelectScrollUpButtonProps as AtomSelectScrollUpButtonProps,
  type SelectSeparatorProps as AtomSelectSeparatorProps,
  type SelectTriggerProps as AtomSelectTriggerProps,
  type SelectValueProps as AtomSelectValueProps,
  type SelectViewportProps as AtomSelectViewportProps,
} from "@flowstack-ui/atom/select";

export type SelectVariant = "outline" | "soft" | "underline";
export type SelectSize = "sm" | "md" | "lg";
export type SelectShape = "sharp" | "rounded" | "pill";

type SelectRootSharedProps = Omit<AtomSelectRootProps, "children"> & {
  children: ReactNode;
  size?: SelectSize;
  fullWidth?: boolean;
};

export type SelectRootProps = SelectRootSharedProps &
  (
    | { variant?: "outline" | "soft"; shape?: SelectShape }
    | { variant: "underline"; shape?: never }
  );
export type SelectTriggerProps = AtomSelectTriggerProps;
export type SelectValueProps = AtomSelectValueProps;
export type SelectIconProps = Omit<AtomSelectIconProps, "children"> & { children?: ReactNode };
export type SelectPortalProps = AtomSelectPortalProps;
export type SelectContentProps = AtomSelectListboxProps;
export type SelectListboxProps = SelectContentProps;
export type SelectViewportProps = AtomSelectViewportProps;
export type SelectScrollUpButtonProps = Omit<AtomSelectScrollUpButtonProps, "children"> & { children?: ReactNode };
export type SelectScrollDownButtonProps = Omit<AtomSelectScrollDownButtonProps, "children"> & { children?: ReactNode };
export type SelectGroupProps = AtomSelectGroupProps;
export type SelectLabelProps = AtomSelectLabelProps;
export type SelectItemProps = AtomSelectItemProps;
export type SelectItemTextProps = AtomSelectItemTextProps;
export type SelectItemIndicatorProps = Omit<AtomSelectItemIndicatorProps, "children"> & { children?: ReactNode };
export type SelectSeparatorProps = AtomSelectSeparatorProps;
export type SelectArrowProps = Omit<AtomSelectArrowProps, "children"> & { children?: ReactNode };

interface SelectVisualContextValue {
  variant: SelectVariant;
  size: SelectSize;
  shape?: SelectShape;
  fullWidth: boolean;
}

const SelectVisualContext = createContext<SelectVisualContextValue>({
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
    <svg aria-hidden="true" className="brick-select-direction-artwork" fill="none" viewBox="0 0 16 16">
      <path d={direction === "up" ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} />
    </svg>
  );
}

function CheckArtwork() {
  return (
    <svg aria-hidden="true" className="brick-select-check-artwork" fill="none" viewBox="0 0 16 16">
      <path d="m3.5 8.25 2.75 2.75 6.25-6" />
    </svg>
  );
}

function selectItemText(children: ReactNode): string | undefined {
  let label: string | undefined;
  Children.forEach(children, (child) => {
    if (label || !isValidElement<{ children?: ReactNode }>(child)) return;
    if (child.type === SelectItemText) {
      const text = Children.toArray(child.props.children)
        .filter((part): part is string | number => typeof part === "string" || typeof part === "number")
        .join("")
        .trim();
      if (text) label = text;
      return;
    }
    label = selectItemText(child.props.children);
  });
  return label;
}

function supplyStaticItemLabels(children: ReactNode): ReactNode {
  const mapped = Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode; label?: string }>(child)) return child;
    const nested = supplyStaticItemLabels(child.props.children);
    if (child.type === SelectItem && child.props.label === undefined) {
      return cloneElement(child, { label: selectItemText(child.props.children) }, nested);
    }
    return cloneElement(child, undefined, nested);
  });
  if (!mapped || mapped.length === 0) return undefined;
  return mapped.length === 1 ? mapped[0] : mapped;
}

export function SelectRoot({
  children,
  fullWidth = true,
  shape = "rounded",
  size = "md",
  variant = "outline",
  ...props
}: SelectRootProps) {
  const resolvedShape = variant === "underline" ? undefined : shape;
  return (
    <SelectVisualContext.Provider value={{ fullWidth, shape: resolvedShape, size, variant }}>
      <AtomSelect.Root {...props}>{supplyStaticItemLabels(children)}</AtomSelect.Root>
    </SelectVisualContext.Provider>
  );
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    const visual = useContext(SelectVisualContext);
    return (
      <AtomSelect.Trigger
        {...props}
        className={mergeClassName("brick-select-trigger", className)}
        data-full-width={visual.fullWidth ? "" : undefined}
        data-shape={visual.shape}
        data-size={visual.size}
        data-slot={slotOrDefault(dataSlot, "select-trigger")}
        data-variant={visual.variant}
        ref={ref}
      />
    );
  },
);

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.Value {...props} className={mergeClassName("brick-select-value", className)} data-slot={slotOrDefault(dataSlot, "select-value")} ref={ref} />;
  },
);

export const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(
  function SelectIcon({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.Icon {...props} className={mergeClassName("brick-select-icon", className)} data-slot={slotOrDefault(dataSlot, "select-icon")} ref={ref}>{children ?? <DirectionArtwork direction="down" />}</AtomSelect.Icon>;
  },
);

export const SelectPortal = AtomSelect.Portal;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.Content {...props} className={mergeClassName("brick-select-content", className)} data-slot={slotOrDefault(dataSlot, "select-listbox")} ref={ref} />;
  },
);

export const SelectListbox = SelectContent;

export const SelectViewport = forwardRef<HTMLDivElement, SelectViewportProps>(
  function SelectViewport({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.Viewport {...props} className={mergeClassName("brick-select-viewport", className)} data-slot={slotOrDefault(dataSlot, "select-viewport")} ref={ref} />;
  },
);

export const SelectScrollUpButton = forwardRef<HTMLButtonElement, SelectScrollUpButtonProps>(
  function SelectScrollUpButton({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.ScrollUpButton {...props} className={mergeClassName("brick-select-scroll-up", className)} data-slot={slotOrDefault(dataSlot, "select-scroll-up-button")} ref={ref}>{children ?? <DirectionArtwork direction="up" />}</AtomSelect.ScrollUpButton>;
  },
);

export const SelectScrollDownButton = forwardRef<HTMLButtonElement, SelectScrollDownButtonProps>(
  function SelectScrollDownButton({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomSelect.ScrollDownButton {...props} className={mergeClassName("brick-select-scroll-down", className)} data-slot={slotOrDefault(dataSlot, "select-scroll-down-button")} ref={ref}>{children ?? <DirectionArtwork direction="down" />}</AtomSelect.ScrollDownButton>;
  },
);

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.Group {...props} className={mergeClassName("brick-select-group", className)} data-slot={slotOrDefault(dataSlot, "select-group")} ref={ref} />;
});

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.Label {...props} className={mergeClassName("brick-select-label", className)} data-slot={slotOrDefault(dataSlot, "select-label")} ref={ref} />;
});

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.Item {...props} className={mergeClassName("brick-select-item", className)} data-slot={slotOrDefault(dataSlot, "select-item")} ref={ref} />;
});

export const SelectItemText = forwardRef<HTMLSpanElement, SelectItemTextProps>(function SelectItemText({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.ItemText {...props} className={mergeClassName("brick-select-item-text", className)} data-slot={slotOrDefault(dataSlot, "select-item-text")} ref={ref} />;
});

export const SelectItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(function SelectItemIndicator({ children, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.ItemIndicator {...props} className={mergeClassName("brick-select-item-indicator", className)} data-slot={slotOrDefault(dataSlot, "select-item-indicator")} ref={ref}>{children ?? <CheckArtwork />}</AtomSelect.ItemIndicator>;
});

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator({ className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.Separator {...props} className={mergeClassName("brick-select-separator", className)} data-slot={slotOrDefault(dataSlot, "select-separator")} ref={ref} />;
});

export const SelectArrow = forwardRef<HTMLSpanElement, SelectArrowProps>(function SelectArrow({ children, className, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSelect.Arrow {...props} className={mergeClassName("brick-select-arrow", className)} data-slot={slotOrDefault(dataSlot, "select-arrow")} ref={ref}>{children ?? <span aria-hidden="true" className="brick-select-arrow-artwork" />}</AtomSelect.Arrow>;
});

SelectTrigger.displayName = "Select.Trigger";
SelectValue.displayName = "Select.Value";
SelectIcon.displayName = "Select.Icon";
SelectContent.displayName = "Select.Content";
SelectViewport.displayName = "Select.Viewport";
SelectScrollUpButton.displayName = "Select.ScrollUpButton";
SelectScrollDownButton.displayName = "Select.ScrollDownButton";
SelectGroup.displayName = "Select.Group";
SelectLabel.displayName = "Select.Label";
SelectItem.displayName = "Select.Item";
SelectItemText.displayName = "Select.ItemText";
SelectItemIndicator.displayName = "Select.ItemIndicator";
SelectSeparator.displayName = "Select.Separator";
SelectArrow.displayName = "Select.Arrow";

export const Select = Object.freeze({
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Content: SelectContent,
  Listbox: SelectListbox,
  Viewport: SelectViewport,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Separator: SelectSeparator,
  Arrow: SelectArrow,
});
