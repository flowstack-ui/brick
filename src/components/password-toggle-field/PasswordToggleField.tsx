"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import {
  PasswordToggleField as AtomPassword,
  type PasswordToggleFieldIconProps as AtomIconProps,
  type PasswordToggleFieldInputProps as AtomInputProps,
  type PasswordToggleFieldRootProps as AtomRootProps,
  type PasswordToggleFieldToggleProps as AtomToggleProps,
} from "@flowstack-ui/atom/password-toggle-field";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
import {
  fieldVariantAttributes,
  type ResponsiveFieldVariant,
} from "../_field-variant/FieldVariant.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";

export type PasswordToggleFieldVariant =
  | "outline"
  | "surface"
  | "soft"
  | "subtle"
  | "ghost"
  | "plain"
  | "underline";
export type PasswordToggleFieldSize = ControlSize;
export type PasswordToggleFieldShape = "sharp" | "rounded" | "pill";

type PasswordToggleFieldSharedRootProps = AtomRootProps & {
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  size?: ResponsiveControlSize;
  "data-slot"?: string;
};

export type PasswordToggleFieldRootProps = PasswordToggleFieldSharedRootProps &
  (
    | ({
        variant?: Exclude<PasswordToggleFieldVariant, "underline">;
      } & RadiusShapeProps<PasswordToggleFieldShape>)
    | {
        variant: ResponsiveFieldVariant;
        shape?: never;
        radius?: never;
      }
  );

export type PasswordToggleFieldInputProps = AtomInputProps;
export type PasswordToggleFieldToggleProps = Omit<
  AtomToggleProps,
  "children"
> & {
  children?: ReactNode;
};
export type PasswordToggleFieldIconProps = Partial<
  Pick<AtomIconProps, "visible" | "hidden">
> &
  Omit<AtomIconProps, "visible" | "hidden">;

function mergeClassName(required: string, className?: string) {
  return className ? `${required} ${className}` : required;
}

function EyeArtwork({ concealed = false }: { concealed?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="brick-password-toggle-field-artwork"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path d="M2.5 10s2.75-4 7.5-4 7.5 4 7.5 4-2.75 4-7.5 4-7.5-4-7.5-4Z" />
      <circle cx="10" cy="10" r="2" />
      {concealed ? <path d="m3 3 14 14" /> : null}
    </svg>
  );
}

export function PasswordToggleFieldRoot({
  children,
  className,
  fullWidth = true,
  shape = "rounded",
  radius,
  style,
  size = "lg",
  variant = "outline",
  showLabel,
  hideLabel,
  "data-slot": dataSlot,
  ...props
}: PasswordToggleFieldRootProps) {
  const { localeText } = useLocaleContext();
  const resolvedShape =
    variant === "underline"
      ? undefined
      : radius === undefined
        ? shape
        : "rounded";

  return (
    <AtomPassword.Root
      {...props}
      hideLabel={hideLabel ?? localeText.hidePassword}
      showLabel={showLabel ?? localeText.showPassword}
    >
      <span
        className={mergeClassName(
          "brick-password-toggle-field brick-control-size",
          className,
        )}
        data-full-width={fullWidth ? "" : undefined}
        data-shape={resolvedShape}
        data-slot={dataSlot ?? "password-toggle-field"}
        style={radiusStyle(
          variant === "underline" ? undefined : radius,
          "--brick-password-radius",
          style,
        )}
        {...fieldVariantAttributes(variant)}
        {...controlSizeDataAttributes(size)}
      >
        {children}
      </span>
    </AtomPassword.Root>
  );
}

export const PasswordToggleFieldInput = forwardRef<
  HTMLInputElement,
  PasswordToggleFieldInputProps
>(function PasswordToggleFieldInput(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomPassword.Input
      {...props}
      className={mergeClassName("brick-password-toggle-field-input", className)}
      data-slot={dataSlot ?? "password-toggle-field-input"}
      ref={ref}
    />
  );
});

export const PasswordToggleFieldToggle = forwardRef<
  HTMLButtonElement,
  PasswordToggleFieldToggleProps
>(function PasswordToggleFieldToggle(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomPassword.Toggle
      {...props}
      className={mergeClassName(
        "brick-password-toggle-field-toggle",
        className,
      )}
      data-slot={dataSlot ?? "password-toggle-field-toggle"}
      ref={ref}
    >
      {children ?? <PasswordToggleFieldIcon />}
    </AtomPassword.Toggle>
  );
});

export const PasswordToggleFieldIcon = forwardRef<
  HTMLSpanElement,
  PasswordToggleFieldIconProps
>(function PasswordToggleFieldIcon(
  {
    hidden = <EyeArtwork />,
    visible = <EyeArtwork concealed />,
    className,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomPassword.Icon
      {...props}
      className={mergeClassName("brick-password-toggle-field-icon", className)}
      data-slot={dataSlot ?? "password-toggle-field-icon"}
      hidden={hidden}
      ref={ref}
      visible={visible}
    />
  );
});

export const PasswordToggleField = {
  Root: PasswordToggleFieldRoot,
  Input: PasswordToggleFieldInput,
  Toggle: PasswordToggleFieldToggle,
  Icon: PasswordToggleFieldIcon,
} as const;
