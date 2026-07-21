import { forwardRef } from "react";
import {
  AppBar as AtomAppBar,
  type AppBarRootProps as AtomAppBarRootProps,
  type AppBarToolbarProps as AtomAppBarToolbarProps,
  type AppBarSectionProps as AtomAppBarSectionProps,
} from "@flowstack-ui/atom/app-bar";

export type AppBarVariant = "solid" | "surface" | "transparent";
export type AppBarTone = "neutral" | "accent";

export interface AppBarRootProps extends AtomAppBarRootProps {
  /** Surface treatment. @default "surface" */
  variant?: AppBarVariant;
  /** Color treatment. @default "neutral" */
  tone?: AppBarTone;
  /** Draw the logical bottom separator. @default true */
  bordered?: boolean;
  /** Add static surface elevation. @default false */
  elevated?: boolean;
  /** Add backdrop blur and a translucent surface. @default false */
  blurred?: boolean;
}

export type AppBarToolbarProps = AtomAppBarToolbarProps;
export type AppBarSectionProps = AtomAppBarSectionProps;

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
      blurred = false,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <AtomAppBar.Root
        {...props}
        className={mergeClassName("brick-app-bar", className)}
        data-blurred={blurred ? "" : undefined}
        data-bordered={bordered ? "" : undefined}
        data-elevated={elevated ? "" : undefined}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const AppBarToolbar = forwardRef<HTMLDivElement, AppBarToolbarProps>(
  function AppBarToolbar({ className, ...props }, ref) {
    return (
      <AtomAppBar.Toolbar
        {...props}
        className={mergeClassName("brick-app-bar-toolbar", className)}
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
    function AppBarSection({ className: consumerClassName, ...props }, ref) {
      return (
        <Part
          {...props}
          className={mergeClassName(className, consumerClassName)}
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
