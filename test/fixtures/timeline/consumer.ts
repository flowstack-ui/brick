import { createElement, createRef } from "react";
import {
  Timeline,
  TimelinePropsProvider,
  type TimelineRootProps,
} from "@flowstack-ui/brick";
import { TimelineRootPropsProvider } from "@flowstack-ui/brick/timeline";
const props: TimelineRootProps = {
  size: { md: "xl" },
  variant: { initial: "subtle", lg: "solid" },
  layout: "compact",
  unstyled: false,
};
createElement(Timeline.Root, { ...props, ref: createRef<HTMLElement>() });
createElement(TimelinePropsProvider, { value: props });
createElement(TimelineRootPropsProvider, {
  value: { showLastSeparator: false },
});
// @ts-expect-error Only logical sides are supported.
createElement(Timeline.Content, { side: "left" });
