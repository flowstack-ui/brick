"use client";

import {
  createElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
export { useSidebarContext } from "@flowstack-ui/atom/sidebar";
export type { SidebarContextValue, SidebarState, SidebarSide, SidebarCollapsedState } from "@flowstack-ui/atom/sidebar";
import {
  Sidebar as AtomSidebar,
  type SidebarMainProps as AtomMainProps,
  type SidebarPanelProps as AtomPanelProps,
  type SidebarRootProps as AtomRootProps,
  type SidebarTriggerProps as AtomTriggerProps,
} from "@flowstack-ui/atom/sidebar";

export type SidebarVariant = "docked" | "floating";
export type SidebarSize = "sm" | "md" | "lg";
export type SidebarPosition = "static" | "sticky";
export type SidebarSurface = "transparent" | "base" | "raised";
export type SidebarInset = "default" | "none";

type ComposedProps<T extends { children?: ReactNode; render?: unknown }> = Omit<T, "asChild" | "children" | "render"> & (
  | { asChild: true; render?: never; children: ReactElement<{ children?: ReactNode }> }
  | { asChild?: false; render?: T["render"]; children?: ReactNode }
);

export type SidebarRootProps = Omit<ComposedProps<AtomRootProps>, "size"> & {
  variant?: SidebarVariant;
  size?: SidebarSize;
  position?: SidebarPosition;
  surface?: SidebarSurface;
  bordered?: boolean;
};
export type SidebarPanelProps = ComposedProps<AtomPanelProps>;
export type SidebarMainProps = ComposedProps<AtomMainProps>;
export type SidebarTriggerProps = ComposedProps<AtomTriggerProps>;

type RenderProp = string | ReactElement | ((props: Record<string, unknown>) => ReactElement);
export type SidebarRegionProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  inset?: SidebarInset;
  children?: ReactNode;
  render?: RenderProp;
  asChild?: boolean;
  "data-slot"?: string;
};
export type SidebarHeaderProps = SidebarRegionProps;
export type SidebarContentProps = SidebarRegionProps;
export type SidebarFooterProps = SidebarRegionProps;

const mergeClassName = (base: string, value?: string) => value ? `${base} ${value}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

function Region({ baseClass, defaultSlot, props, ref }: { baseClass: string; defaultSlot: string; props: SidebarRegionProps; ref: Ref<HTMLDivElement> }) {
  const { asChild = false, children, className, inset = "default", render, "data-slot": dataSlot, ...rest } = props;
  const merged = { ...rest, children, className: mergeClassName(baseClass, className), "data-inset": inset, "data-slot": slot(dataSlot, defaultSlot), ref };
  if (asChild) {
    // The supplied child is the host, not another copy of its own children.
    const { children: _host, ...hostProps } = merged;
    return composeHost(children, hostProps);
  }
  if (typeof render === "function") return render(merged);
  if (typeof render === "string") return createElement(render, merged);
  if (isValidElement(render)) return composeHost(render, merged);
  return <div {...rest} className={merged.className} data-inset={inset} data-slot={merged["data-slot"]} ref={ref}>{children}</div>;
}

export const SidebarRoot = forwardRef<HTMLDivElement, SidebarRootProps>(function SidebarRoot({ asChild = false, bordered = true, children, className, position = "static", render, size = "md", surface, variant = "docked", "data-slot": dataSlot, ...props }, ref) {
  const resolvedSurface = surface ?? (variant === "floating" ? "raised" : "base");
  return <AtomSidebar.Root {...props} asChild={asChild} className={mergeClassName("brick-sidebar", className)} data-bordered={bordered ? "true" : "false"} data-position={position} data-size={size} data-slot={slot(dataSlot, "sidebar")} data-surface={resolvedSurface} data-variant={variant} ref={ref} render={render}>{children}</AtomSidebar.Root>;
});
export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(function SidebarTrigger({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSidebar.Trigger {...props} asChild={asChild} className={mergeClassName("brick-sidebar__trigger", className)} data-slot={slot(dataSlot, "sidebar-trigger")} ref={ref} render={render}>{children}</AtomSidebar.Trigger>;
});
export const SidebarPanel = forwardRef<HTMLElement, SidebarPanelProps>(function SidebarPanel({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSidebar.Panel {...props} asChild={asChild} className={mergeClassName("brick-sidebar__panel", className)} data-slot={slot(dataSlot, "sidebar-panel")} ref={ref} render={render}>{children}</AtomSidebar.Panel>;
});
export const SidebarMain = forwardRef<HTMLElement, SidebarMainProps>(function SidebarMain({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
  return <AtomSidebar.Main {...props} asChild={asChild} className={mergeClassName("brick-sidebar__main", className)} data-slot={slot(dataSlot, "sidebar-main")} ref={ref} render={render}>{children}</AtomSidebar.Main>;
});
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>((props, ref) => <Region baseClass="brick-sidebar__header" defaultSlot="sidebar-header" props={props} ref={ref} />);
export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>((props, ref) => <Region baseClass="brick-sidebar__content" defaultSlot="sidebar-content" props={props} ref={ref} />);
export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>((props, ref) => <Region baseClass="brick-sidebar__footer" defaultSlot="sidebar-footer" props={props} ref={ref} />);

SidebarRoot.displayName = "Sidebar.Root";
SidebarTrigger.displayName = "Sidebar.Trigger";
SidebarPanel.displayName = "Sidebar.Panel";
SidebarHeader.displayName = "Sidebar.Header";
SidebarContent.displayName = "Sidebar.Content";
SidebarFooter.displayName = "Sidebar.Footer";
SidebarMain.displayName = "Sidebar.Main";

export const Sidebar = Object.freeze({ Root: SidebarRoot, Trigger: SidebarTrigger, Panel: SidebarPanel, Header: SidebarHeader, Content: SidebarContent, Footer: SidebarFooter, Main: SidebarMain });
