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

const surfaceRecipe: Pick<TagsInputRootProps, "variant"> = { variant: "surface" };
void surfaceRecipe;
const variantMap: TagsInputRootProps = { variant: { sm: "underline", md: "subtle", lg: "plain" } };
const contrast: TagsInputItemsProps = { tone: "contrast", className: "topics", style: { maxWidth: "100%" } };
const indexed: TagsInputRootProps = { ids: { item: index => `item-${index}`, itemInput: index => `edit-${index}`, itemDeleteTrigger: index => `delete-${index}` } };
// @ts-expect-error responsive recipes exclude explicit radius
const responsiveRadius: TagsInputRootProps = { variant: { md: "outline" }, radius: "none" };
// @ts-expect-error responsive recipes exclude explicit shape
const responsiveShape: TagsInputRootProps = { variant: { sm: "underline" }, shape: "rounded" };
void [variantMap, contrast, indexed, responsiveRadius, responsiveShape];
