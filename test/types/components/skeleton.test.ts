import { createElement, createRef } from "react";
import { Skeleton, type SkeletonAnimation, type SkeletonProps, type SkeletonVariant } from "../../../src/skeleton.js";
import { Skeleton as RootSkeleton } from "../../../src/index.js";
const ref = createRef<HTMLSpanElement>();
const variants: SkeletonVariant[] = ["text", "circular", "rectangular", "rounded"];
const animations: SkeletonAnimation[] = ["pulse", "wave", "none"];
const props: SkeletonProps = { variant: "rounded", animation: "wave", loading: true, width: 200, height: "4rem", lines: 2 };
createElement(Skeleton, { ...props, ref });
createElement(RootSkeleton, props);
// @ts-expect-error closed variant
createElement(Skeleton, { variant: "pill" });
// @ts-expect-error closed animation
createElement(Skeleton, { animation: "spin" });
void variants; void animations;
createElement(Skeleton, { asChild: true, radius: "surface", size: 48 }, createElement("article"));
createElement(Skeleton, { lines: 3, gap: 12, lastLineWidth: "60%" });
// @ts-expect-error finite radius vocabulary
createElement(Skeleton, { radius: "huge" });
