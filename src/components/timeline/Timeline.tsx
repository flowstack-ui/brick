"use client";

import {
  createContext,
  createElement,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type TimelineSize = "sm" | "md" | "lg" | "xl";
export type TimelineVariant = "soft" | "subtle" | "solid" | "outline" | "plain";
export type TimelineTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type TimelineSide = "before" | "after";
export type TimelineLayout = "balanced" | "compact";
type HostProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  unstyled?: boolean;
  [key: `data-${string}`]: string | number | boolean | undefined;
} & ({ asChild: true; children: ReactElement } | { asChild?: false });
export type TimelineRecipeProps = {
  size?: ResponsiveValue<TimelineSize>;
  variant?: ResponsiveValue<TimelineVariant>;
  tone?: TimelineTone;
  layout?: ResponsiveValue<TimelineLayout>;
  showLastSeparator?: boolean;
  unstyled?: boolean;
};
export type TimelineRootProps = HostProps & TimelineRecipeProps;
export type TimelineItemProps = HostProps & { tone?: TimelineTone };
export type TimelineContentProps = HostProps & { side?: TimelineSide };
export type TimelineConnectorProps = HostProps;
export type TimelineSeparatorProps = HostProps;
export type TimelineIndicatorProps = HostProps;
export type TimelineTitleProps = HostProps;
export type TimelineDescriptionProps = HostProps;
export type TimelinePropsProviderProps = {
  value: TimelineRecipeProps;
  children?: ReactNode;
};

const Defaults = createContext<TimelineRecipeProps>({});
const Unstyled = createContext(false);

/** Undefined inherits; a supplied responsive map replaces the outer map. */
export function TimelinePropsProvider({
  value,
  children,
}: TimelinePropsProviderProps) {
  const outer = useContext(Defaults);
  const defined = Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined),
  );
  return (
    <Defaults.Provider value={{ ...outer, ...defined }}>
      {children}
    </Defaults.Provider>
  );
}
export const TimelineRootPropsProvider = TimelinePropsProvider;

function host(
  tag: string,
  props: HostProps,
  ref: Ref<HTMLElement>,
  slot: string,
  unstyled: boolean,
) {
  const {
    asChild,
    children,
    className,
    unstyled: _unstyled,
    ...native
  } = props;
  const attributes = {
    ...native,
    className:
      [unstyled ? undefined : `brick-${slot}`, className]
        .filter(Boolean)
        .join(" ") || undefined,
    "data-slot": props["data-slot"] ?? slot,
    "data-unstyled": unstyled ? "" : undefined,
    ref,
  };
  return asChild
    ? composeHost(children, attributes)
    : createElement(tag, attributes, children);
}

export const TimelineRoot = forwardRef<HTMLElement, TimelineRootProps>(
  function TimelineRoot(props, ref) {
    const defaults = useContext(Defaults);
    const {
      size = defaults.size ?? "md",
      variant = defaults.variant ?? "solid",
      tone = defaults.tone ?? "neutral",
      layout = defaults.layout ?? "balanced",
      showLastSeparator = defaults.showLastSeparator ?? false,
      unstyled = defaults.unstyled ?? false,
      ...native
    } = props;
    return (
      <Unstyled.Provider value={unstyled}>
        {host(
          "ol",
          {
            ...native,
            ...responsiveDataAttributes("data-size", size, {
              defaultValue: "md",
              alwaysInitial: true,
            }),
            ...responsiveDataAttributes("data-variant", variant, {
              defaultValue: "solid",
              alwaysInitial: true,
            }),
            ...responsiveDataAttributes("data-layout", layout, {
              defaultValue: "balanced",
              alwaysInitial: true,
            }),
            "data-tone": tone,
            "data-show-last-separator": showLastSeparator,
          },
          ref,
          "timeline",
          unstyled,
        )}
      </Unstyled.Provider>
    );
  },
);
export const TimelineItem = forwardRef<HTMLElement, TimelineItemProps>(
  function TimelineItem({ tone, unstyled: own, ...props }, ref) {
    const inherited = useContext(Unstyled);
    return host(
      "li",
      { ...props, "data-tone": tone },
      ref,
      "timeline-item",
      own ?? inherited,
    );
  },
);
export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  function TimelineContent({ side = "after", unstyled: own, ...props }, ref) {
    const inherited = useContext(Unstyled);
    return host(
      "div",
      { ...props, "data-side": side },
      ref,
      "timeline-content",
      own ?? inherited,
    );
  },
);
function part(tag: string, slot: string, decorative = false) {
  const Part = forwardRef<HTMLElement, HostProps>(function TimelinePart(
    { unstyled: own, ...props },
    ref,
  ) {
    const inherited = useContext(Unstyled);
    return host(
      tag,
      { ...props, ...(decorative ? { "aria-hidden": true as const } : {}) },
      ref,
      slot,
      own ?? inherited,
    );
  });
  Part.displayName = slot;
  return Part;
}
export const TimelineConnector = part("div", "timeline-connector", true);
export const TimelineSeparator = part("span", "timeline-separator", true);
export const TimelineIndicator = part("span", "timeline-indicator", true);
export const TimelineTitle = part("p", "timeline-title");
export const TimelineDescription = part("p", "timeline-description");
export const Timeline = Object.freeze({
  Root: TimelineRoot,
  Item: TimelineItem,
  Connector: TimelineConnector,
  Separator: TimelineSeparator,
  Indicator: TimelineIndicator,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
  PropsProvider: TimelinePropsProvider,
  RootPropsProvider: TimelineRootPropsProvider,
});
