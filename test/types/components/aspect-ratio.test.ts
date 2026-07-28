import { createElement, createRef } from "react";
import {
  AspectRatio,
  AspectRatioRoot,
  type AspectRatioOverflow,
  type AspectRatioRadius,
  type AspectRatioRootProps,
  type AspectRatioVariant,
} from "../../../src/aspect-ratio.js";
import { AspectRatio as RootAspectRatio } from "../../../src/index.js";

const ref = createRef<HTMLDivElement>();
const variant: AspectRatioVariant = "outline";
const radius: AspectRatioRadius = "lg";
const overflow: AspectRatioOverflow = "visible";
const props: AspectRatioRootProps = {
  "aria-label": "Preview",
  className: "consumer-frame",
  onClick: () => undefined,
  overflow,
  radius,
  ratio: 4 / 3,
  variant,
};

createElement(AspectRatio.Root, { ...props, ref }, "Media");
createElement(AspectRatioRoot, { ratio: 1 });
createElement(RootAspectRatio.Root, { asChild: true }, createElement("section"));
createElement(AspectRatio.Root, { render: (renderProps) => createElement("article", renderProps) });

// @ts-expect-error variant is closed
createElement(AspectRatio.Root, { variant: "solid" });
// @ts-expect-error radius is closed
createElement(AspectRatio.Root, { radius: "xl" });
// @ts-expect-error overflow is closed
createElement(AspectRatio.Root, { overflow: "clip" });
// @ts-expect-error ratio remains numeric
createElement(AspectRatio.Root, { ratio: "16 / 9" });
// @ts-expect-error responsive values are application policy
createElement(AspectRatio.Root, { ratio: { base: 1, md: 16 / 9 } });
