import { forwardRef, type HTMLAttributes } from "react";
import { controlSizeDataAttributes, type ResponsiveControlSize } from "../_control-size/ControlSize.js";
import { fieldVariantAttributes, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  size?: ResponsiveControlSize;
  variant?: ResponsiveFieldVariant;
  /** Corners of the external segment; underline always remains square. */
  radius?: Radius;
}

/** A noninteractive external segment, composed with Input through Group attached. */
export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon(
  { size = "lg", variant = "outline", radius, style, className, ...props }, ref,
) {
  return <span {...props} ref={ref} style={radiusStyle(radius, "--brick-input-addon-radius", style)} className={["brick-input-addon brick-control-size", className].filter(Boolean).join(" ")}
    data-slot="input-addon" {...controlSizeDataAttributes(size)} {...fieldVariantAttributes(variant)} />;
});
