import type { SplitterRootProps, SplitterResizeTriggerProps } from "../../../src/splitter.js";
const root: SplitterRootProps = { panels: [{ id: "a", minSize: "200px" }, { id: "b" }], defaultSizes: { a: 30, b: "70%" } };
const trigger: SplitterResizeTriggerProps = { before: "a", after: "b", "aria-label": "Files width" };
const units: SplitterRootProps = { panels: [{ id: "a", minSize: "2rem", maxSize: "50vw" }, { id: "b", minSize: "2em" }], defaultSizes: { a: "20vh" } };
// @ts-expect-error arbitrary CSS expressions are intentionally unsupported
const invalid: SplitterRootProps = { panels: [{ id: "a", minSize: "calc(100% - 10px)" }, { id: "b" }] };
void [root, trigger, units, invalid];
