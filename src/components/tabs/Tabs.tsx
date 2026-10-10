import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { layoutHost } from "../_internal/layout-host.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  Tabs as AtomTabs,
  type TabsContentProps as AtomTabsContentProps,
  type TabsIndicatorProps as AtomTabsIndicatorProps,
  type TabsListProps as AtomTabsListProps,
  type TabsRootProps as AtomTabsRootProps,
  type TabsRootProviderProps as AtomTabsRootProviderProps,
  type TabsTriggerProps as AtomTabsTriggerProps,
} from "@flowstack-ui/atom/tabs";

export type TabsSize = "sm" | "md" | "lg";
export {
  useTabs,
  useTabsContext,
  TabsContext,
  type UseTabsProps,
  type UseTabsReturn,
  type TabsIds,
  type TabsContextValue,
} from "@flowstack-ui/atom/tabs";
export type TabsVariant =
  | "line"
  | "solid"
  | "soft"
  | "subtle"
  | "enclosed"
  | "outline"
  | "plain";
export type TabsTone = "accent" | "neutral";
export type TabsContentInset = "none" | "sm" | "md" | "lg";
export type TabsLayout = "auto" | "stacked" | "side";
export type TabsListColumns = "auto" | 1 | 2 | 3 | 4;
export type TabsListRadius = Radius | "default";
export type TabsTriggerRadius = Radius | "default";
export type TabsJustify = "start" | "center" | "end";
export type TabsContentSpacing = "inset" | "adjacent";
export type TabsContentAnimation = "none" | "fade";

export interface TabsRecipeProps {
  size?: ResponsiveValue<TabsSize>;
  variant?: ResponsiveValue<TabsVariant>;
  tone?: ResponsiveValue<TabsTone>;
  fullWidth?: ResponsiveValue<boolean>;
  layout?: ResponsiveValue<TabsLayout>;
}
const TabsRecipeContext = createContext<TabsRecipeProps>({});
export interface TabsRootProps extends AtomTabsRootProps, TabsRecipeProps {}
export interface TabsRootProviderProps
  extends AtomTabsRootProviderProps,
    TabsRecipeProps {}
export type TabsListProps = AtomTabsListProps & {
  columns?: ResponsiveValue<TabsListColumns>;
  radius?: TabsListRadius;
  triggerRadius?: TabsTriggerRadius;
  justify?: ResponsiveValue<TabsJustify>;
};
export type TabsTriggerProps = AtomTabsTriggerProps;
export interface TabsContentProps extends AtomTabsContentProps {
  inset?: TabsContentInset;
  spacing?: TabsContentSpacing;
  animation?: TabsContentAnimation;
}
export interface TabsIndicatorProps extends AtomTabsIndicatorProps {
  radius?: Radius;
}
export type TabsContentGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & { "data-slot"?: string } & (
    | { asChild?: false; children?: ReactNode }
    | { asChild: true; children: ReactElement }
  );

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}
function recipeAttributes({
  size = "md",
  variant = "line",
  tone = "accent",
  fullWidth = false,
  layout = "auto",
}: TabsRecipeProps) {
  return {
    ...responsiveDataAttributes("data-size", size, {
      defaultValue: "md",
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-variant", variant, {
      defaultValue: "line",
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-tone", tone, {
      defaultValue: "accent",
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-full-width", fullWidth, {
      defaultValue: false,
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-layout", layout, {
      defaultValue: "auto",
      alwaysInitial: true,
    }),
  };
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  function TabsRoot(
    {
      className,
      fullWidth = false,
      layout = "auto",
      size = "md",
      variant = "line",
      tone = "accent",
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    return (
      <TabsRecipeContext.Provider value={{ variant, layout }}>
        <AtomTabs.Root
          {...props}
          {...recipeAttributes({ fullWidth, layout, size, variant, tone })}
          className={classes("brick-tabs", className)}
          data-slot={slot ?? "tabs-root"}
          ref={ref}
        />
      </TabsRecipeContext.Provider>
    );
  },
);
export const TabsRootProvider = forwardRef<
  HTMLDivElement,
  TabsRootProviderProps
>(function TabsRootProvider(
  {
    className,
    fullWidth,
    layout,
    size,
    variant,
    tone,
    "data-slot": slot,
    ...props
  },
  ref,
) {
  return (
    <TabsRecipeContext.Provider value={{ variant, layout }}>
      <AtomTabs.RootProvider
        {...props}
        {...recipeAttributes({ fullWidth, layout, size, variant, tone })}
        className={classes("brick-tabs", className)}
        data-slot={slot ?? "tabs-root"}
        ref={ref}
      />
    </TabsRecipeContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      className,
      columns,
      justify = "start",
      radius = "default",
      style,
      triggerRadius,
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    const { variant = "line", layout = "auto" } = useContext(TabsRecipeContext);
    const columnAttributes =
      columns === undefined
        ? {}
        : responsiveDataAttributes("data-columns", columns, {
            alwaysInitial: true,
          });
    const radiusStyles = radiusStyle(
      radius === "default" ? undefined : radius,
      "--brick-tabs-radius",
      style,
    );
    return (
      <AtomTabs.List
        {...props}
        {...responsiveDataAttributes("data-variant", variant, {
          defaultValue: "line",
          alwaysInitial: true,
        })}
        {...responsiveDataAttributes("data-layout", layout, {
          defaultValue: "auto",
          alwaysInitial: true,
        })}
        {...columnAttributes}
        {...responsiveDataAttributes("data-justify", justify, {
          defaultValue: "start",
          alwaysInitial: true,
        })}
        className={classes("brick-tabs-list", className)}
        style={radiusStyle(
          triggerRadius === "default" ? "control" : triggerRadius,
          "--brick-tabs-trigger-radius",
          radiusStyles,
        )}
        data-radius={radius}
        data-slot={slot ?? "tabs-list"}
        data-trigger-radius={triggerRadius}
        ref={ref}
      />
    );
  },
);

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomTabs.Trigger
        {...props}
        className={classes("brick-tabs-trigger", className)}
        data-slot={slot ?? "tabs-trigger"}
        ref={ref}
      />
    );
  },
);

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent(
    { className, inset, spacing, animation, "data-slot": slot, ...props },
    ref,
  ) {
    return (
      <AtomTabs.Content
        {...props}
        className={classes("brick-tabs-content", className)}
        data-inset={inset}
        data-spacing={spacing}
        data-animation={animation}
        data-slot={slot ?? "tabs-content"}
        ref={ref}
      />
    );
  },
);

export const TabsIndicator = forwardRef<HTMLDivElement, TabsIndicatorProps>(
  function TabsIndicator(
    { className, radius, style, "data-slot": slot, ...props },
    ref,
  ) {
    return (
      <AtomTabs.Indicator
        {...props}
        style={radiusStyle(radius, "--brick-tabs-indicator-radius", style)}
        className={classes("brick-tabs-indicator", className)}
        data-slot={slot ?? "tabs-indicator"}
        ref={ref}
      />
    );
  },
);
export const TabsContentGroup = forwardRef<
  HTMLDivElement,
  TabsContentGroupProps
>(function TabsContentGroup(
  {
    asChild,
    children,
    className,
    "data-slot": slot = "tabs-content-group",
    ...props
  },
  ref,
) {
  const native = {
    ...props,
    className: classes("brick-tabs-content-group", className),
    "data-slot": slot,
  };
  return asChild ? (
    layoutHost(children, native, ref, "Tabs.ContentGroup")
  ) : (
    <div {...native} ref={ref}>
      {children}
    </div>
  );
});

TabsRoot.displayName = "Tabs.Root";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";
TabsContent.displayName = "Tabs.Content";

export const Tabs = Object.freeze({
  Root: TabsRoot,
  RootProvider: TabsRootProvider,
  Context: AtomTabs.Context,
  List: TabsList,
  Trigger: TabsTrigger,
  ContentGroup: TabsContentGroup,
  Content: TabsContent,
  Indicator: TabsIndicator,
});
