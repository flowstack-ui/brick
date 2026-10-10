import { createElement, createRef } from "react";
import {
  Section,
  type SectionElement,
  type SectionProps,
  type SectionSpacing,
} from "../../../src/section.js";
import { Section as RootSection } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: SectionElement[] = ["section", "div", "article", "aside"];
const spacing: SectionSpacing[] = ["none", "sm", "md", "lg", "xl", "2xl"];
const props: SectionProps = {
  "aria-labelledby": "services-title",
  as: "section",
  children: "Content",
  className: "consumer-section",
  endSpacing: { initial: "sm", md: "lg" },
  onClick: () => undefined,
  spacing: { initial: "md", lg: "xl" },
  startSpacing: "none",
  style: { minInlineSize: 0 },
};

createElement(Section, { ...props, ref });
createElement(RootSection, { as: "div", spacing: "2xl" });

// @ts-expect-error Hosts are deliberately closed.
createElement(Section, { as: "main" });
// @ts-expect-error Spacing uses a closed recipe.
createElement(Section, { spacing: "3rem" });
createElement(Section, { spacing: { lg: "xl" } });
// @ts-expect-error Breakpoints are deliberately closed.
createElement(Section, { spacing: { initial: "md", xxl: "2xl" } });
// @ts-expect-error Section does not own paint.
createElement(Section, { level: "subtle" });
// @ts-expect-error Section does not own inline measure.
createElement(Section, { measure: "wide" });
// @ts-expect-error Section does not own child layout.
createElement(Section, { gap: "4" });

void elements;
void spacing;
