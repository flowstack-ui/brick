import { Prose, type ProseElement, type ProseMeasure, type ProseProps, type ProseSize } from "../../../src/prose.js";
const element: ProseElement = "article";
const size: ProseSize = "lg";
const measure: ProseMeasure = "wide";
const props: ProseProps = { as: element, size, measure, children: "Guide" };
void Prose; void props;
const responsive: ProseProps = { size: { lg: "lg" }, tone: "secondary", measure: "reading", codeOverflow: "scroll", tableLayout: "auto" };
void responsive;
// @ts-expect-error Responsive objects must not be empty.
const emptySize: ProseProps = { size: {} };
void emptySize;
// @ts-expect-error Prose does not accept raw HTML strings as a convenience API.
const invalidHtml: ProseProps = { html: "<p>Unsafe</p>" };
// @ts-expect-error Prose accepts trusted React children, never injected HTML.
const invalidDangerousHtml: ProseProps = { dangerouslySetInnerHTML: { __html: "<p>Unsafe</p>" } };
// @ts-expect-error Prose has a closed size scale.
const invalidSize: ProseProps = { size: "xl" };
// @ts-expect-error Prose only exposes neutral document-region hosts.
const invalidHost: ProseProps = { as: "main" };
void invalidHtml; void invalidDangerousHtml; void invalidSize; void invalidHost;
