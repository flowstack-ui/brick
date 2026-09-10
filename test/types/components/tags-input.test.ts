import type {
  TagsInputRootProps,
  TagsInputItemsProps,
} from "../../../src/tags-input.js";
const responsive: TagsInputRootProps = {
  size: { lg: "xl" },
  variant: "soft",
  shape: "pill",
  value: ["a"],
  onValueChange: ({ value }) => value,
};
const items: TagsInputItemsProps = {
  tone: "accent",
  disabled: (value) => value === "fixed",
};
// @ts-expect-error underline excludes shape
const underline: TagsInputRootProps = { variant: "underline", shape: "pill" };
// @ts-expect-error empty responsive object
const empty: TagsInputRootProps = { size: {} };
// @ts-expect-error closed tone union
const tone: TagsInputItemsProps = { tone: "purple" };
void [responsive, items, underline, empty, tone];
