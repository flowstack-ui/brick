import { surfaceEffects, type SurfaceEffectProps } from "../_surface-effects/SurfaceEffects.js";
import { forwardRef } from "react";
import {
  normalizeResponsiveValue,
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";
import {
  AppBar as AtomAppBar,
  type AppBarRootProps as AtomAppBarRootProps,
  type AppBarToolbarProps as AtomAppBarToolbarProps,
  type AppBarSectionProps as AtomAppBarSectionProps,
} from "@flowstack-ui/atom/app-bar";

export type AppBarVariant = "solid" | "surface" | "transparent";
export type AppBarTone = "neutral" | "accent";
export type AppBarToolbarInset = "default" | "none";
export type AppBarLayout = "balanced" | "flex";
export type AppBarDensity = "comfortable" | "compact";
export type AppBarElevation = "none" | "low" | "medium" | "high";

export interface AppBarRootProps extends AtomAppBarRootProps, SurfaceEffectProps {
  /** Surface treatment. @default "surface" */
  variant?: AppBarVariant;
  /** Color treatment. @default "neutral" */
  tone?: AppBarTone;
  /** Draw the logical bottom separator. @default true */
  bordered?: boolean;
  /** Add static surface elevation. @default false */
  elevated?: boolean;
  /** Named shadow role. Overrides elevated when provided. */
  elevation?: AppBarElevation;
  /** Logical top offset for positioned bars; numeric values use spacing factors. */
  offset?: ResponsiveValue<SpacingValue>;
  /** Add backdrop blur and a translucent surface. @default false */
  blurred?: boolean;
}

export interface AppBarToolbarProps
  extends Omit<AtomAppBarToolbarProps, "density"> {
  /** Logical inline content inset. Use none when Container owns the gutter. @default "default" */
  inset?: ResponsiveValue<AppBarToolbarInset>;
  density?: ResponsiveValue<AppBarDensity>;
  layout?: ResponsiveValue<AppBarLayout>;
  gap?: ResponsiveValue<SpacingValue>;
}
export interface AppBarSectionProps extends AtomAppBarSectionProps {
  gap?: ResponsiveValue<SpacingValue>;
}

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const AppBarRoot = forwardRef<HTMLElement, AppBarRootProps>(
  function AppBarRoot(
    {
      variant = "surface",
      tone = "neutral",
      bordered = true,
      elevated = false,
      elevation,
      offset,
      treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity,
      blurred = false,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const effects = surfaceEffects({ treatment, backgroundOpacity, backdropBlur, backdropSaturate, borderColor, borderOpacity }, blurred);
    return (
      <AtomAppBar.Root
        {...props}
        {...effects.attributes}
        className={mergeClassName("brick-app-bar", className)}
        data-blurred={effects.blurred ? "" : undefined}
        data-bordered={bordered ? "" : undefined}
        data-elevated={
          (elevation ? elevation !== "none" : elevated) ? "" : undefined
        }
        data-elevation={elevation ?? (elevated ? "low" : "none")}
        style={{
          ...effects.style,
          ...(offset === undefined
            ? {}
            : responsiveSpacingStyles("--brick-app-bar-offset", offset)),
          ...style,
        }}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const AppBarToolbar = forwardRef<HTMLDivElement, AppBarToolbarProps>(
  function AppBarToolbar(
    {
      className,
      inset = "default",
      density = "comfortable",
      layout = "balanced",
      gap,
      style,
      ...props
    },
    ref,
  ) {
    return (
      <AtomAppBar.Toolbar
        {...props}
        className={mergeClassName("brick-app-bar-toolbar", className)}
        density={normalizeResponsiveValue(density).initial ?? "comfortable"}
        {...responsiveDataAttributes("data-density", density, {
          defaultValue: "comfortable",
          alwaysInitial: true,
        })}
        {...responsiveDataAttributes("data-inset", inset, {
          defaultValue: "default",
          alwaysInitial: true,
        })}
        {...responsiveDataAttributes("data-layout", layout, {
          defaultValue: "balanced",
          alwaysInitial: true,
        })}
        style={{
          ...(gap === undefined
            ? {}
            : responsiveSpacingStyles("--brick-app-bar-toolbar-gap", gap)),
          ...style,
        }}
        ref={ref}
      />
    );
  },
);

function createSection(
  Part: typeof AtomAppBar.Start,
  className: string,
  displayName: string,
) {
  const Section = forwardRef<HTMLDivElement, AppBarSectionProps>(
    function AppBarSection(
      { className: consumerClassName, gap, style, ...props },
      ref,
    ) {
      return (
        <Part
          {...props}
          className={mergeClassName(className, consumerClassName)}
          style={{
            ...(gap === undefined
              ? {}
              : responsiveSpacingStyles("--brick-app-bar-section-gap", gap)),
            ...style,
          }}
          ref={ref}
        />
      );
    },
  );
  Section.displayName = displayName;
  return Section;
}

export const AppBarStart = createSection(
  AtomAppBar.Start,
  "brick-app-bar-start",
  "AppBar.Start",
);
export const AppBarCenter = createSection(
  AtomAppBar.Center,
  "brick-app-bar-center",
  "AppBar.Center",
);
export const AppBarEnd = createSection(
  AtomAppBar.End,
  "brick-app-bar-end",
  "AppBar.End",
);

AppBarRoot.displayName = "AppBar.Root";
AppBarToolbar.displayName = "AppBar.Toolbar";

export const AppBar = Object.freeze({
  Root: AppBarRoot,
  Toolbar: AppBarToolbar,
  Start: AppBarStart,
  Center: AppBarCenter,
  End: AppBarEnd,
});
