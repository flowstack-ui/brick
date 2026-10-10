"use client";

import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  RadioGroup as AtomRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
  type RadioGroupRootProps as AtomRootProps,
  type RadioGroupRootProviderProps as AtomProviderProps,
  type RadioRootProps as AtomRadioProps,
  type RadioGroupItemRootProps as AtomItemRootProps,
  type RadioGroupPartProps,
  type RadioGroupItemTextProps,
} from "@flowstack-ui/atom/radio-group";
import { Radiomark, type RadiomarkTone } from "../radiomark/Radiomark.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export {
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from "@flowstack-ui/atom/radio-group";
export type {
  RadioGroupController,
  RadioGroupItemHiddenInputProps,
  RadioGroupPartProps,
  RadioGroupItemTextProps,
} from "@flowstack-ui/atom/radio-group";
export type RadioGroupSize = "xs" | "sm" | "md" | "lg";
export type RadioGroupVariant = "solid" | "outline" | "subtle";
export type RadioGroupTone = RadiomarkTone;
export interface RadioGroupPresentationProps {
  size?: ResponsiveValue<RadioGroupSize>;
  variant?: ResponsiveValue<RadioGroupVariant>;
  tone?: RadioGroupTone;
  density?: "comfortable" | "compact";
  labelPlacement?: "start" | "end";
}
export interface RadioGroupRootProps
  extends AtomRootProps,
    RadioGroupPresentationProps {
  gap?: ResponsiveValue<SpacingValue>;
}
export interface RadioGroupRootProviderProps
  extends AtomProviderProps,
    RadioGroupPresentationProps {
  gap?: ResponsiveValue<SpacingValue>;
}
export interface RadioGroupItemProps
  extends AtomRadioProps,
    RadioGroupPresentationProps {
  children: ReactNode;
  /** Replaces the checked dot; does not add a second indicator. */
  indicator?: ReactNode;
}
export interface RadioGroupItemRootProps
  extends AtomItemRootProps,
    RadioGroupPresentationProps {}
const defaults: Required<RadioGroupPresentationProps> = {
  size: "md",
  variant: "solid",
  tone: "accent",
  density: "comfortable",
  labelPlacement: "end",
};
const Presentation = createContext(defaults);
const cn = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;
function split<T extends RadioGroupPresentationProps>(
  props: T,
  parent = defaults,
) {
  const {
    size = parent.size,
    variant = parent.variant,
    tone = parent.tone,
    density = parent.density,
    labelPlacement = parent.labelPlacement,
    ...rest
  } = props;
  return { value: { size, variant, tone, density, labelPlacement }, rest };
}
function attributes(value: Required<RadioGroupPresentationProps>) {
  return {
    ...responsiveDataAttributes("data-size", value.size, {
      defaultValue: "md",
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-variant", value.variant, {
      defaultValue: "solid",
      alwaysInitial: true,
    }),
    "data-tone": value.tone,
    "data-density": value.density,
    "data-label-placement": value.labelPlacement,
  };
}
export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot(props, ref) {
    const {
      value,
      rest: { gap, style, className, ...rest },
    } = split(props);
    return (
      <Presentation.Provider value={value}>
        <AtomRadioGroup.Root
          {...rest}
          {...attributes(value)}
          className={cn("brick-radio-group", className)}
          style={{
            ...(gap === undefined ? {} : responsiveSpacingStyles("--brick-radio-group-gap", gap)),
            ...style,
          }}
          ref={ref}
        />
      </Presentation.Provider>
    );
  },
);
export const RadioGroupRootProvider = forwardRef<
  HTMLDivElement,
  RadioGroupRootProviderProps
>(function RadioGroupRootProvider(props, ref) {
  const {
    value,
    rest: { gap, style, className, ...rest },
  } = split(props);
  return (
    <Presentation.Provider value={value}>
      <AtomRadioGroup.RootProvider
        {...rest}
        {...attributes(value)}
        className={cn("brick-radio-group", className)}
        style={{
          ...(gap === undefined ? {} : responsiveSpacingStyles("--brick-radio-group-gap", gap)),
          ...style,
        }}
        ref={ref}
      />
    </Presentation.Provider>
  );
});
function Mark({
  checked,
  children,
}: {
  checked: boolean;
  children?: ReactNode;
}) {
  const { size, variant, tone } = useContext(Presentation);
  return (
    <Radiomark
      size={size}
      variant={variant}
      tone={tone}
      checked={checked}
      className="brick-radio-group-control"
      data-slot="radio-group-control"
    >
      {children}
    </Radiomark>
  );
}
export const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(function RadioGroupItem(props, ref) {
  const parent = useContext(Presentation);
  const group = useRadioGroupContext();
  const {
    value,
    rest: { children, indicator, className, asChild, ...rest },
  } = split(props, parent);
  const contents = (label: ReactNode) => (
    <>
      <Mark checked={group.activeValue === rest.value}>{indicator}</Mark>
      <span className="brick-radio-group-label" data-slot="radio-group-label">{label}</span>
    </>
  );
  const child = children as ReactElement<{ children?: ReactNode }>;
  return (
    <Presentation.Provider value={value}>
      <AtomRadioGroup.Radio
        {...rest}
        {...attributes(value)}
        ref={ref}
        asChild={asChild}
        data-slot={rest["data-slot"] ?? "radio-group-item"}
        className={cn("brick-radio-group-item", className)}
      >
        {asChild
          ? cloneElement(child, undefined, contents(child.props.children))
          : contents(children)}
      </AtomRadioGroup.Radio>
    </Presentation.Provider>
  );
});
export const RadioGroupItemRoot = forwardRef<
  HTMLDivElement,
  RadioGroupItemRootProps
>(function RadioGroupItemRoot(props, ref) {
  const {
    value,
    rest: { className, ...rest },
  } = split(props, useContext(Presentation));
  return (
    <Presentation.Provider value={value}>
      <AtomRadioGroup.ItemRoot
        {...rest}
        {...attributes(value)}
        className={cn("brick-radio-group-item-root", className)}
        ref={ref}
      />
    </Presentation.Provider>
  );
});
function part(name: "Label" | "ItemControl" | "ItemDescription") {
  const Component = AtomRadioGroup[name];
  return forwardRef<HTMLSpanElement, RadioGroupPartProps>(
    function RadioGroupPart({ className, ...props }, ref) {
      return (
        <Component
          {...props}
          className={cn(
            `brick-radio-group-${name === "Label" ? "group-label" : name === "ItemControl" ? "item-control" : "description"}`,
            className,
          )}
          ref={ref}
        />
      );
    },
  );
}
export const RadioGroupLabel = part("Label");
export const RadioGroupItemControl = part("ItemControl");
export const RadioGroupItemDescription = part("ItemDescription");
export const RadioGroupItemText = forwardRef<
  HTMLLabelElement,
  RadioGroupItemTextProps
>(function RadioGroupItemText({ className, ...props }, ref) {
  return (
    <AtomRadioGroup.ItemText
      {...props}
      className={cn("brick-radio-group-label", className)}
      ref={ref}
    />
  );
});
export const RadioGroupItemIndicator = forwardRef<
  HTMLSpanElement,
  RadioGroupPartProps
>(function RadioGroupItemIndicator({ children, ...props }, ref) {
  const item = useRadioGroupItemContext();
  return (
    <AtomRadioGroup.ItemIndicator {...props} ref={ref}>
      <Mark checked={item.checked}>{children}</Mark>
    </AtomRadioGroup.ItemIndicator>
  );
});
export const RadioGroupItemHiddenInput = AtomRadioGroup.ItemHiddenInput;
export const RadioGroupContext = AtomRadioGroup.Context;
export const RadioGroupItemContext = AtomRadioGroup.ItemContext;
export const RadioGroup = Object.freeze({
  Root: RadioGroupRoot,
  RootProvider: RadioGroupRootProvider,
  Item: RadioGroupItem,
  Label: RadioGroupLabel,
  ItemRoot: RadioGroupItemRoot,
  ItemHiddenInput: RadioGroupItemHiddenInput,
  ItemControl: RadioGroupItemControl,
  ItemIndicator: RadioGroupItemIndicator,
  ItemText: RadioGroupItemText,
  ItemDescription: RadioGroupItemDescription,
  Context: RadioGroupContext,
  ItemContext: RadioGroupItemContext,
});
