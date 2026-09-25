import { Mark, type MarkProps, type MarkTone, type MarkVariant } from "../../../src/mark.js";
const statusTone: MarkTone = "success";
const textVariant: MarkVariant = "text";
// @ts-expect-error Projected hosts require an element.
const invalidChild: MarkProps = {asChild:true, children:"passage"};
void statusTone; void textVariant; void invalidChild;
const variant: MarkVariant = "solid";
const tone: MarkTone = "neutral";
const props: MarkProps = { children: "relevant", variant, tone };
void Mark; void props;
// @ts-expect-error Mark owns static content, not matching.
const invalidQuery: MarkProps = { children: "relevant", query: "rel" };
// @ts-expect-error Mark keeps native semantics.
const invalidHost: MarkProps = { children: "relevant", as: "span" };
void invalidQuery; void invalidHost;
