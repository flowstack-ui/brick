import { createElement, createRef } from "react";
import { Rating, type RatingDisplayProps, type RatingRootProps, type RatingSize, type RatingSummaryProps, type RatingTone, type RatingVariant } from "../../../src/rating.js";
import { Rating as RootRating } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>(); const sizes: RatingSize[] = ["sm", "md", "lg"]; const tones: RatingTone[] = ["accent", "neutral"]; const variants: RatingVariant[] = ["solid", "outline"]; const props: RatingRootProps = { defaultValue: 3.5, step: 0.5, size: "lg", tone: "neutral", variant: "outline" };
createElement(Rating.Root, { ...props, ref, "aria-label": "Score" }, createElement(Rating.Item, { value: 1 })); createElement(RootRating.Root, { "aria-label": "Score" });
const displayProps: RatingDisplayProps = { label: "4.5 out of 5 stars", value: 4.5 };
createElement(Rating.Display, displayProps);
const summaryProps: RatingSummaryProps = { label: "4.8 out of 5 stars", value: 4.8, valueText: "4.8" };
createElement(Rating.Summary, summaryProps);
// @ts-expect-error closed tone
createElement(Rating.Root, { tone: "danger" });
// @ts-expect-error Item requires value
createElement(Rating.Item, {});
// @ts-expect-error Display requires a localized label
createElement(Rating.Display, { value: 4.5 });
// @ts-expect-error Summary requires a localized label
createElement(Rating.Summary, { value: 4.8 });
void sizes; void tones; void variants;
