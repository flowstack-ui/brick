import { createElement, createRef } from "react";
import { Rating, type RatingRootProps, type RatingSize, type RatingTone, type RatingVariant } from "../../../src/rating.js";
import { Rating as RootRating } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>(); const sizes: RatingSize[] = ["sm", "md", "lg"]; const tones: RatingTone[] = ["accent", "neutral"]; const variants: RatingVariant[] = ["solid", "outline"]; const props: RatingRootProps = { defaultValue: 3.5, step: 0.5, size: "lg", tone: "neutral", variant: "outline" };
createElement(Rating.Root, { ...props, ref, "aria-label": "Score" }, createElement(Rating.Item, { value: 1 })); createElement(RootRating.Root, { "aria-label": "Score" });
// @ts-expect-error closed tone
createElement(Rating.Root, { tone: "danger" });
// @ts-expect-error Item requires value
createElement(Rating.Item, {});
void sizes; void tones; void variants;
