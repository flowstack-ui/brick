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
import {
  fieldVariantAttributes,
  type ResponsiveFieldVariant,
} from "../_field-variant/FieldVariant.js";

export type TextareaVariant = "outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
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
  | (RadiusShapeProps<TextareaShape> & {
      /** Visual container recipe. @default "outline" */
      variant?: Exclude<TextareaVariant, "underline">;
      /** Visual container geometry. @default "rounded" */
    })
  | {
      variant: ResponsiveFieldVariant;
      shape?: never;
      radius?: never;
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
      radius,
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
    const hasFixedGeometry = typeof variant === "string" && variant !== "underline";
    const resolvedShape = hasFixedGeometry ? radius === undefined ? shape : "rounded" : undefined;
    const resolvedResize = autoResize ? "none" : resize;

    return (
      <span
        dir={props.dir}
        className={mergeClassName("brick-textarea brick-control-size", className)}
        data-autoresize={autoResize ? "" : undefined}
        data-full-width={fullWidth ? "" : undefined}
        data-resize={resolvedResize}
        data-shape={resolvedShape}
        data-slot={dataSlot ?? "textarea"}
        {...fieldVariantAttributes(variant)}
        style={radiusStyle(hasFixedGeometry ? radius : undefined, "--brick-textarea-radius", style)}
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
