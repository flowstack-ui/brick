"use client";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type ReactNode, type SVGProps } from "react";
import { AvatarFallback as AtomAvatarFallback, AvatarImage as AtomAvatarImage, AvatarRoot as AtomAvatarRoot } from "@flowstack-ui/atom/avatar";
import { useAvatarGroupPresentation } from "../avatar-group/AvatarGroupContext.js";
import { radiusStyle, type RadiusShapeProps, type DistributiveOmit } from "../_radius/Radius.js";

export type AvatarSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "away" | "busy" | "offline";
export type AvatarVariant = "subtle" | "solid" | "outline";
export type AvatarTone = "neutral" | "accent" | "contrast";
export type AvatarRootProps = Omit<ComponentPropsWithoutRef<typeof AtomAvatarRoot>, "color"> & RadiusShapeProps<AvatarShape> & {
  /** Full identity, or empty when the surrounding composition supplies it. */
  alt: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  tone?: AvatarTone;
  status?: AvatarStatus;
  borderless?: boolean;
};
const IdentityContext = createContext("");
const classes = (base: string, extra?: string) => extra ? `${base} ${extra}` : base;
export const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(function AvatarRoot({ alt, size, shape, radius, tone, variant, borderless, status, style, className, children, "data-slot": slot = "avatar", ...props }, ref) {
  const group = useAvatarGroupPresentation();
  // A child corner choice must not also inherit a conflicting group choice.
  const resolvedRadius = radius ?? (shape === undefined ? group?.radius : undefined);
  const resolvedShape = shape ?? (radius === undefined ? group?.shape : undefined) ?? "circle";
  return <IdentityContext.Provider value={alt}>
    <AtomAvatarRoot {...props} ref={ref} className={classes("brick-avatar", className)} data-slot={slot}
      data-size={size ?? group?.size ?? "md"} data-shape={resolvedRadius === undefined ? resolvedShape : "rounded"}
      data-tone={tone ?? group?.tone ?? "neutral"} data-variant={variant ?? group?.variant ?? "subtle"}
      data-borderless={(borderless ?? group?.borderless) ? "" : undefined} data-status={status}
      style={radiusStyle(resolvedRadius, "--brick-avatar-radius", style)}>{children}</AtomAvatarRoot>
  </IdentityContext.Provider>;
});
export type AvatarImageProps = ComponentPropsWithoutRef<typeof AtomAvatarImage>;
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage({ alt, className, "data-slot": slot = "avatar-image", ...props }, ref) {
  const identity = useContext(IdentityContext);
  return <AtomAvatarImage {...props} ref={ref} alt={alt ?? identity} draggable={props.draggable ?? false} className={classes("brick-avatar__image", className)} data-slot={slot} />;
});
export type AvatarIconProps = SVGProps<SVGSVGElement>;
export const AvatarIcon = forwardRef<SVGSVGElement, AvatarIconProps>(function AvatarIcon({ className, ...props }, ref) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} ref={ref} aria-hidden="true" focusable="false" className={classes("brick-avatar__icon", className)}>
    <circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" />
  </svg>;
});
export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AtomAvatarFallback>;
export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(function AvatarFallback({ className, children, "data-slot": slot = "avatar-fallback", ...props }, ref) {
  const alt = useContext(IdentityContext);
  const semantics = alt === "" ? { "aria-hidden": true as const } : { role: "img", "aria-label": alt };
  return <AtomAvatarFallback {...semantics} {...props} ref={ref} className={classes("brick-avatar__fallback", className)} data-slot={slot}>{children ?? <AvatarIcon />}</AtomAvatarFallback>;
});
export type AvatarProps = DistributiveOmit<AvatarRootProps, "children" | "asChild" | "render"> & {
  fallback?: ReactNode;
  fallbackDelayMs?: number;
  imageProps?: Omit<AvatarImageProps, "src" | "alt" | "children" | "asChild" | "render">;
};
const AvatarConvenience = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar({ fallback, fallbackDelayMs, imageProps, ...props }, ref) {
  return <AvatarRoot {...props} ref={ref}><AvatarImage {...imageProps} /><AvatarFallback delayMs={fallbackDelayMs}>{fallback}</AvatarFallback></AvatarRoot>;
});
export const Avatar = Object.assign(AvatarConvenience, { Root: AvatarRoot, Image: AvatarImage, Fallback: AvatarFallback, Icon: AvatarIcon });
