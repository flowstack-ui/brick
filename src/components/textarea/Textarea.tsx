import {
  forwardRef,
  type CSSProperties,
} from "react";
import {
  Textarea as AtomTextarea,
  type TextareaCountProps as AtomTextareaCountProps,
  type TextareaRootProps as AtomTextareaRootProps,
} from "@flowstack-ui/atom/textarea";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";

export type TextareaVariant = "outline" | "soft" | "underline";
export type TextareaSize = ControlSize;
export type TextareaShape = "sharp" | "rounded";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

type TextareaRootSharedProps = Omit<
  AtomTextareaRootProps,
  | "autoResize"
  | "className"
  | "color"
  | "maxRows"
  | "size"
  | "style"
> & {
  /** Complete responsive control size. @default "lg" */
  size?: ResponsiveControlSize;
  /** Stretch to the available inline size. @default true */
  fullWidth?: boolean;
  /** Class applied to the visual wrapper. */
  className?: string;
  /** Style and component variables applied to the visual wrapper. */
  style?: CSSProperties;
  /** Class applied to the native textarea. */
  textareaClassName?: string;
  /** Style applied to the native textarea. */
  textareaStyle?: CSSProperties;
};

type TextareaVariantProps =
  | {
      /** Visual container recipe. @default "outline" */
      variant?: "outline" | "soft";
      /** Visual container geometry. @default "rounded" */
      shape?: TextareaShape;
    }
  | {
      variant: "underline";
      shape?: never;
    };

type TextareaResizeProps =
  | {
      /** Grow with content through released Atom behavior. */
      autoResize: true;
      /** Maximum rows before the auto-resizing control scrolls. */
      maxRows?: number;
      resize?: never;
    }
  | {
      autoResize?: false;
      maxRows?: never;
      /** User-operated resize direction. @default "vertical" */
      resize?: TextareaResize;
    };

export type TextareaRootProps = TextareaRootSharedProps &
  TextareaVariantProps &
  TextareaResizeProps;

export type TextareaCountProps = AtomTextareaCountProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const TextareaRoot = forwardRef<HTMLTextAreaElement, TextareaRootProps>(
  function TextareaRoot(
    {
      autoResize = false,
      children,
      className,
      fullWidth = true,
      maxRows,
      minRows = 3,
      resize = "vertical",
      shape = "rounded",
      size = "lg",
      style,
      textareaClassName,
      textareaStyle,
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const resolvedShape = variant === "underline" ? undefined : shape;
    const resolvedResize = autoResize ? "none" : resize;

    return (
      <span
        className={mergeClassName("brick-textarea brick-control-size", className)}
        data-autoresize={autoResize ? "" : undefined}
        data-full-width={fullWidth ? "" : undefined}
        data-resize={resolvedResize}
        data-shape={resolvedShape}
        data-slot={dataSlot ?? "textarea"}
        data-variant={variant}
        style={style}
        {...controlSizeDataAttributes(size)}
      >
        <AtomTextarea.Root
          {...props}
          autoResize={autoResize}
          className={mergeClassName(
            "brick-textarea-control",
            textareaClassName,
          )}
          data-slot="textarea-control"
          maxRows={autoResize ? maxRows : undefined}
          minRows={minRows}
          ref={ref}
          style={textareaStyle}
        >
          {children}
        </AtomTextarea.Root>
      </span>
    );
  },
);

export const TextareaCount = forwardRef<
  HTMLSpanElement,
  TextareaCountProps
>(function TextareaCount(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomTextarea.Count
      {...props}
      className={mergeClassName("brick-textarea-count", className)}
      data-slot={dataSlot ?? "textarea-count"}
      ref={ref}
    />
  );
});

TextareaRoot.displayName = "Textarea.Root";
TextareaCount.displayName = "Textarea.Count";

export const Textarea = Object.freeze({
  Root: TextareaRoot,
  Count: TextareaCount,
});
