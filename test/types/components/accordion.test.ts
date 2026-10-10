import { Accordion, type AccordionIndicatorPlacement, type AccordionRootProps, type AccordionSize, type AccordionVariant } from "../../../src/accordion.js";

const single: AccordionRootProps = { defaultValue: "one", type: "single" };
const responsive: AccordionRootProps = { size: { md: "lg" }, variant: { initial: "subtle", lg: "enclosed" }, lazyMount: false, unmountOnExit: false, hideMode: "activity", ids: { itemTrigger: value => `trigger-${value}` }, onExitComplete: value => { const text: string = value; void text; } };
void responsive;
// @ts-expect-error unknown responsive recipe
const invalidResponsive: AccordionRootProps = { variant: { md: "filled" } };
void invalidResponsive;
const multiple: AccordionRootProps = { defaultValue: ["one"], type: "multiple" };
void single;
void multiple;
void Accordion;
const variants: AccordionVariant[] = ["plain", "ghost", "soft", "outline"];
const sizes: AccordionSize[] = ["sm", "md", "lg", "xl"];
const placements: AccordionIndicatorPlacement[] = ["start", "end"];
void variants; void sizes; void placements;

// @ts-expect-error multiple mode requires an array value
const invalid: AccordionRootProps = { type: "multiple", value: "one" };
void invalid;
