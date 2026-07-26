"use client";

import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
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

type ComposedProps<T extends { children?: ReactNode; render?: unknown }> = Omit<T, "asChild" | "children" | "render"> & (
  | { asChild: true; render?: never; children: ReactElement<{ children?: ReactNode }> }
  | { asChild?: false; render?: T["render"]; children?: ReactNode }
);

export type SidebarRootProps = Omit<ComposedProps<AtomRootProps>, "size"> & {
  variant?: SidebarVariant;
  size?: SidebarSize;
  position?: SidebarPosition;
};
export type SidebarPanelProps = ComposedProps<AtomPanelProps>;
export type SidebarMainProps = ComposedProps<AtomMainProps>;
export type SidebarTriggerProps = ComposedProps<AtomTriggerProps>;

type RenderProp = string | ReactElement | ((props: Record<string, unknown>) => ReactElement);
export type SidebarRegionProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
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

function composeRefs(...refs: (Ref<unknown> | undefined)[]) {
  return (node: unknown) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as { current: unknown }).current = node;
    }
  };
}

function mergeProps(original: Record<string, unknown>, override: Record<string, unknown>) {
  const result = { ...original };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const current = original[key];
    if (key === "className" && typeof current === "string" && typeof value === "string") result[key] = `${current} ${value}`;
    else if (key === "style" && current && value && typeof current === "object" && typeof value === "object") result[key] = { ...current, ...value };
    else if (key === "ref") result[key] = composeRefs(current as Ref<unknown> | undefined, value as Ref<unknown> | undefined);
    else result[key] = value;
  }
  return result;
}

function Region({ baseClass, defaultSlot, props, ref }: { baseClass: string; defaultSlot: string; props: SidebarRegionProps; ref: Ref<HTMLDivElement> }) {
  const { asChild = false, children, className, render, "data-slot": dataSlot, ...rest } = props;
  const merged = { ...rest, children, className: mergeClassName(baseClass, className), "data-slot": slot(dataSlot, defaultSlot), ref };
  if (asChild) {
    const child = Children.only(children) as ReactElement;
    return cloneElement(child, mergeProps(child.props as Record<string, unknown>, merged));
  }
  if (typeof render === "function") return render(merged);
  if (typeof render === "string") return createElement(render, merged);
  if (isValidElement(render)) return cloneElement(render, mergeProps(render.props as Record<string, unknown>, merged));
  return <div {...rest} className={merged.className} data-slot={merged["data-slot"]} ref={ref}>{children}</div>;
}

export const SidebarRoot = forwardRef<HTMLDivElement, SidebarRootProps>(function SidebarRoot({ asChild = false, children, className, position = "static", render, size = "md", variant = "docked", "data-slot": dataSlot, ...props }, ref) {
  return <AtomSidebar.Root {...props} asChild={asChild} className={mergeClassName("brick-sidebar", className)} data-position={position} data-size={size} data-slot={slot(dataSlot, "sidebar")} data-variant={variant} ref={ref} render={render}>{children}</AtomSidebar.Root>;
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
