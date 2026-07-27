import { forwardRef } from "react";
import {
  Tabs as AtomTabs,
  type TabsContentProps as AtomTabsContentProps,
  type TabsIndicatorProps as AtomTabsIndicatorProps,
  type TabsListProps as AtomTabsListProps,
  type TabsRootProps as AtomTabsRootProps,
  type TabsTriggerProps as AtomTabsTriggerProps,
} from "@flowstack-ui/atom/tabs";

export type TabsSize = "sm" | "md" | "lg";
export type TabsVariant = "line" | "solid" | "soft" | "enclosed";

export interface TabsRootProps extends AtomTabsRootProps {
  size?: TabsSize;
  variant?: TabsVariant;
  fullWidth?: boolean;
}
export type TabsListProps = AtomTabsListProps;
export type TabsTriggerProps = AtomTabsTriggerProps;
export type TabsContentProps = AtomTabsContentProps;
export type TabsIndicatorProps = AtomTabsIndicatorProps;

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  function TabsRoot(
    { className, fullWidth = false, size = "md", variant = "line", "data-slot": slot, ...props },
    ref,
  ) {
    return <AtomTabs.Root {...props} className={classes("brick-tabs", className)} data-full-width={fullWidth ? "" : undefined} data-size={size} data-slot={slot ?? "tabs-root"} data-variant={variant} ref={ref} />;
  },
);

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ className, "data-slot": slot, ...props }, ref) {
    return <AtomTabs.List {...props} className={classes("brick-tabs-list", className)} data-slot={slot ?? "tabs-list"} ref={ref} />;
  },
);

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ className, "data-slot": slot, ...props }, ref) {
    return <AtomTabs.Trigger {...props} className={classes("brick-tabs-trigger", className)} data-slot={slot ?? "tabs-trigger"} ref={ref} />;
  },
);

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ className, "data-slot": slot, ...props }, ref) {
    return <AtomTabs.Content {...props} className={classes("brick-tabs-content", className)} data-slot={slot ?? "tabs-content"} ref={ref} />;
  },
);

export function TabsIndicator({ className, "data-slot": slot, ...props }: TabsIndicatorProps) {
  return <AtomTabs.Indicator {...props} className={classes("brick-tabs-indicator", className)} data-slot={slot ?? "tabs-indicator"} />;
}

TabsRoot.displayName = "Tabs.Root";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";
TabsContent.displayName = "Tabs.Content";

export const Tabs = Object.freeze({ Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent, Indicator: TabsIndicator });
