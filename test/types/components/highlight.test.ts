import { Highlight, type HighlightProps, type HighlightTone, type HighlightVariant } from "../../../src/highlight.js";
const variant: HighlightVariant = "underline";
const tone: HighlightTone = "neutral";
const props: HighlightProps = { text: "Design system", query: ["design", "system"], variant, tone, exactMatch: true };
void Highlight; void props;
// @ts-expect-error Highlight accepts plain text rather than arbitrary children.
const invalidChildren: HighlightProps = { text: "Text", query: "Text", children: "Text" };
// @ts-expect-error Active-result navigation is application-owned.
const invalidActive: HighlightProps = { text: "Text", query: "Text", activeIndex: 0 };
// @ts-expect-error Brick fixes the semantic root to native span.
const invalidRender: HighlightProps = { text: "Text", query: "Text", render: () => null };
void invalidChildren; void invalidActive; void invalidRender;
