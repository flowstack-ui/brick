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

export type InputVariant = "outline" | "soft" | "underline";
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
    | {
        /** Visual container recipe. @default "outline" */
        variant?: "outline" | "soft";
        /** Visual container geometry. @default "rounded" */
        shape?: InputShape;
      }
    | {
        variant: "underline";
        shape?: never;
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
    const resolvedShape = variant === "underline" ? undefined : shape;

    return (
      <span
        className={mergeClassName("brick-input brick-control-size", className)}
        data-full-width={fullWidth ? "" : undefined}
        data-shape={resolvedShape}
        data-slot={dataSlot ?? "input"}
        data-variant={variant}
        style={style}
        {...controlSizeDataAttributes(size)}
      >
        {startAdornment !== undefined ? (
          <span className="brick-input-start" data-slot="input-start">
            {startAdornment}
          </span>
        ) : null}
        <AtomInput.Root
          {...props}
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
