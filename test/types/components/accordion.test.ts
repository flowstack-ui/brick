import { Accordion, type AccordionRootProps } from "../../../src/accordion.js";

const single: AccordionRootProps = { defaultValue: "one", type: "single" };
const multiple: AccordionRootProps = { defaultValue: ["one"], type: "multiple" };
void single;
void multiple;
void Accordion;

// @ts-expect-error multiple mode requires an array value
const invalid: AccordionRootProps = { type: "multiple", value: "one" };
void invalid;
