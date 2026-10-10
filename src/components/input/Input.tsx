import {
  forwardRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Input as AtomInput,
  type InputRootProps as AtomInputRootProps,
} from "@flowstack-ui/atom/input";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import { fieldVariantAttributes, type FieldVariant, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";

export type InputVariant = "outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline";
export type InputSize = ControlSize;
export type InputShape = "sharp" | "rounded" | "pill";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url";

type InputSharedProps = Omit<
  AtomInputRootProps,
  "children" | "className" | "color" | "size" | "style" | "type"
> & {
  /** Native text-like input type. @default "text" */
  type?: InputType;
  /** Complete responsive control size. @default "lg" */
  size?: ResponsiveControlSize;
  /** Stretch to the available inline size. @default true */
  fullWidth?: boolean;
  /** Consumer-owned content at the logical start. */
  startAdornment?: ReactNode;
  /** Consumer-owned content at the logical end, before Clear. */
  endAdornment?: ReactNode;
  /** Render the Atom-powered clear action. @default false */
  clearable?: boolean;
  /** Accessible name for the clear action. @default "Clear input" */
  clearLabel?: string;
  /** Called after Atom clears the value. */
  onClear?: () => void;
  /** Class applied to the visual wrapper. */
  className?: string;
  /** Style and component variables applied to the visual wrapper. */
  style?: CSSProperties;
  /** Class applied to the native input. */
  inputClassName?: string;
  /** Style applied to the native input. */
  inputStyle?: CSSProperties;
};

export type InputProps = InputSharedProps &
  (
    | (RadiusShapeProps<InputShape> & {
        /** Visual container recipe. @default "outline" */
        variant?: Exclude<InputVariant, "underline">;
        /** Visual container geometry. @default "rounded" */
      })
    | {
        variant: ResponsiveFieldVariant;
        shape?: never;
        radius?: never;
      }
  );

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function ClearArtwork() {
  return (
    <svg
      aria-hidden="true"
      className="brick-input-clear-artwork"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      clearable = false,
      clearLabel,
      className,
      endAdornment,
      fullWidth = true,
      inputClassName,
      inputStyle,
      onClear,
      shape = "rounded",
      radius,
      size = "lg",
      startAdornment,
      style,
      type = "text",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const { localeText } = useLocaleContext();
    const resolvedShape = variant === "underline" ? undefined : radius === undefined ? shape : "rounded";
    // Group styles its direct children, which for Input means the painted
    // wrapper. Native naming, events and arbitrary data attributes stay on input.
    const nativeProps = { ...props };
    const groupProps: Record<string, unknown> = {};
    for (const key of ["data-group-item", "data-group-first", "data-group-last", "data-group-skip"] as const) {
      if (key in nativeProps) {
        groupProps[key] = (nativeProps as Record<string, unknown>)[key];
        delete (nativeProps as Record<string, unknown>)[key];
      }
    }

    return (
      <span
        {...groupProps}
        className={mergeClassName("brick-input brick-control-size", className)}
        data-full-width={fullWidth ? "" : undefined}
        data-shape={resolvedShape}
        data-slot={dataSlot ?? "input"}
        {...fieldVariantAttributes(variant)}
        style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-input-radius", style)}
        {...controlSizeDataAttributes(size)}
      >
        {startAdornment !== undefined ? (
          <span className="brick-input-start" data-slot="input-start">
            {startAdornment}
          </span>
        ) : null}
        <AtomInput.Root
          {...nativeProps}
          className={mergeClassName("brick-input-control", inputClassName)}
          data-slot="input-control"
          ref={ref}
          style={inputStyle}
          type={type}
        >
          {endAdornment !== undefined ? (
            <span className="brick-input-end" data-slot="input-end">
              {endAdornment}
            </span>
          ) : null}
          {clearable ? (
            <AtomInput.Clear
              aria-label={clearLabel ?? localeText.clearInput}
              className="brick-input-clear"
              data-slot="input-clear"
              onClear={onClear}
            >
              <ClearArtwork />
            </AtomInput.Clear>
          ) : null}
        </AtomInput.Root>
      </span>
    );
  },
);

Input.displayName = "Input";
