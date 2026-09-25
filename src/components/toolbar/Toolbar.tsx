"use client";
import { createContext, forwardRef, useContext } from "react";
import {
  Toolbar as AtomToolbar,
  type ToolbarRootProps as AtomRootProps,
  type ToolbarButtonProps as AtomButtonProps,
  type ToolbarLinkProps as AtomLinkProps,
  type ToolbarSeparatorProps,
  type ToolbarGroupProps,
  type ToolbarToggleGroupProps as AtomToggleGroupProps,
  type ToolbarToggleItemProps as AtomToggleItemProps,
} from "@flowstack-ui/atom/toolbar";
import {
  Button,
  ButtonContent,
  buttonPresentation,
  type ButtonProps,
  type ButtonSize,
  type ButtonVisualProps,
} from "../button/Button.js";
import { Input, type InputProps } from "../input/Input.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import type {
  ToggleProps,
  ToggleTone,
  ToggleVariant,
} from "../toggle/Toggle.js";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
export type ToolbarVariant = "plain" | "soft" | "outline" | "surface";
export type ToolbarSize = ButtonSize;
export interface ToolbarRootProps extends AtomRootProps {
  radius?: Radius;
  variant?: ToolbarVariant;
  size?: ResponsiveValue<ToolbarSize>;
}
export type ToolbarButtonProps = DistributiveOmit<
  ButtonProps,
  "href" | "target" | "rel" | "type"
> &
  Pick<AtomButtonProps, "focusableWhenDisabled">;
export type ToolbarLinkProps = AtomLinkProps & ButtonVisualProps;
export type { ToolbarSeparatorProps, ToolbarGroupProps };
export type ToolbarInputProps = DistributiveOmit<
  InputProps,
  "clearable" | "clearLabel" | "onClear" | "startAdornment" | "endAdornment"
>;
export type ToolbarToggleTone = ToggleTone;
export type ToolbarToggleVariant = ToggleVariant;
type SelectionPresentation = Pick<
  ToggleProps,
  "variant" | "tone" | "size" | "radius" | "focusRing"
>;
export type ToolbarToggleGroupProps = DistributiveOmit<
  AtomToggleGroupProps,
  "color"
> &
  SelectionPresentation;
export type ToolbarToggleItemProps = AtomToggleItemProps &
  SelectionPresentation & { iconOnly?: boolean };
const SizeContext = createContext<ResponsiveValue<ToolbarSize>>("md");
const SelectionContext = createContext<SelectionPresentation>({});
const classes = (base: string, extra?: string) =>
  extra ? base + " " + extra : base;

export const ToolbarRoot = forwardRef<HTMLDivElement, ToolbarRootProps>(
  function ToolbarRoot(
    { size = "md", variant = "soft", radius, style, className, ...props },
    ref,
  ) {
    return (
      <SizeContext.Provider value={size}>
        <AtomToolbar.Root
          {...props}
          ref={ref}
          className={classes("brick-toolbar", className)}
          data-variant={variant}
          {...responsiveDataAttributes("data-size", size, {
            alwaysInitial: true,
            defaultValue: "md",
          })}
          style={radiusStyle(radius, "--brick-toolbar-radius", style)}
        />
      </SizeContext.Provider>
    );
  },
);
export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton({ focusableWhenDisabled, ...props }, ref) {
    const size = useContext(SizeContext);
    // A composed host owns presentation; Toolbar only supplies behavior.
    if (props.asChild || props.render)
      return (
        <AtomToolbar.Button
          {...(props as AtomButtonProps)}
          focusableWhenDisabled={focusableWhenDisabled}
          ref={ref}
        />
      );
    return (
      <Button
        variant="ghost"
        tone="neutral"
        size={size}
        focusRing="inside"
        {...props}
        className={classes("brick-toolbar__button", props.className)}
        ref={ref}
        render={
          <AtomToolbar.Button
            disabled={Boolean(props.disabled || props.loading)}
            focusableWhenDisabled={focusableWhenDisabled}
          />
        }
      />
    );
  },
);
export const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  function ToolbarLink(
    {
      variant = "ghost",
      tone = "neutral",
      size: ownSize,
      shape,
      radius,
      fullWidth,
      focusRing = "inside",
      startIcon,
      endIcon,
      style,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const size = useContext(SizeContext);
    if (props.asChild || props.render)
      return (
        <AtomToolbar.Link
          {...props}
          className={className}
          style={style}
          ref={ref}
        >
          {children}
        </AtomToolbar.Link>
      );
    return (
      <AtomToolbar.Link
        {...props}
        {...buttonPresentation(
          {
            variant,
            tone,
            size: ownSize ?? size,
            shape,
            radius,
            fullWidth,
            focusRing,
          },
          classes("brick-toolbar__link", className),
          "md",
        )}
        style={radiusStyle(radius, "--brick-button-radius", style)}
        ref={ref}
      >
        <ButtonContent startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ButtonContent>
      </AtomToolbar.Link>
    );
  },
);
export const ToolbarSeparator = forwardRef<
  HTMLDivElement,
  ToolbarSeparatorProps
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <AtomToolbar.Separator
      {...props}
      ref={ref}
      className={classes("brick-toolbar__separator", className)}
    />
  );
});
export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  function ToolbarGroup({ className, ...props }, ref) {
    return (
      <AtomToolbar.Group
        {...props}
        ref={ref}
        className={classes("brick-toolbar__group", className)}
      />
    );
  },
);
export const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>(
  function ToolbarInput({ size: ownSize, ...props }, ref) {
    const size = useContext(SizeContext);
    return (
      <AtomToolbar.Input
        render={<Input {...props} size={ownSize ?? size} />}
        disabled={props.disabled}
        ref={ref}
      />
    );
  },
);
export const ToolbarToggleGroup = forwardRef<
  HTMLDivElement,
  ToolbarToggleGroupProps
>(function ToolbarToggleGroup(
  {
    variant = "ghost",
    tone = "neutral",
    size,
    radius,
    focusRing,
    className,
    ...props
  },
  ref,
) {
  return (
    <SelectionContext.Provider
      value={{ variant, tone, size, radius, focusRing }}
    >
      <AtomToolbar.ToggleGroup
        {...props}
        className={classes("brick-toolbar__toggle-group", className)}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    </SelectionContext.Provider>
  );
});
export const ToolbarToggleItem = forwardRef<
  HTMLButtonElement,
  ToolbarToggleItemProps
>(function ToolbarToggleItem(
  {
    variant: ownVariant,
    tone: ownTone,
    size: ownSize,
    radius: ownRadius,
    focusRing: ownFocusRing,
    iconOnly,
    className,
    style,
    ...props
  },
  ref,
) {
  const group = useContext(SelectionContext);
  const inheritedSize = useContext(SizeContext);
  const radius = ownRadius ?? group.radius;
  if (props.asChild || props.render)
    return (
      <AtomToolbar.ToggleItem
        {...props}
        ref={ref}
        className={className}
        style={style}
      />
    );
  return (
    <AtomToolbar.ToggleItem
      {...props}
      ref={ref}
      className={classes("brick-toggle", className)}
      data-tone={ownTone ?? group.tone ?? "neutral"}
      data-variant={ownVariant ?? group.variant ?? "ghost"}
      data-shape="rounded"
      data-icon-only={iconOnly ? "" : undefined}
      data-focus-ring={ownFocusRing ?? group.focusRing ?? "inside"}
      {...responsiveDataAttributes(
        "data-size",
        ownSize ?? group.size ?? inheritedSize,
        { alwaysInitial: true, defaultValue: "md" },
      )}
      style={radiusStyle(radius, "--brick-toggle-radius", style)}
    />
  );
});
export const Toolbar = {
  Root: ToolbarRoot,
  Button: ToolbarButton,
  Link: ToolbarLink,
  Separator: ToolbarSeparator,
  Group: ToolbarGroup,
  Input: ToolbarInput,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
} as const;
