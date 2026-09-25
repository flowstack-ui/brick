import { createElement, createRef } from "react";
import { EmptyState, type EmptyStateRootProps, type EmptyStateTitleProps } from "../../../src/empty-state.js";
createElement(EmptyState.Title, { as: "h2", ref: createRef<HTMLHeadingElement>() });
// @ts-expect-error Heading semantics stay headings.
const tag: EmptyStateTitleProps = { as: "div" };
// @ts-expect-error Application data state is not a recipe.
const loading: EmptyStateRootProps = { loading: true };
// @ts-expect-error Alignment is logical.
const align: EmptyStateRootProps = { align: "left" };
void [tag, loading, align];
// @ts-expect-error Host projection requires one element child.
const missingHost: EmptyStateRootProps = { asChild: true };
void missingHost;
const responsive: EmptyStateRootProps = { size: { md: "lg", xl: "sm" }, align: { initial: "start", lg: "center" } };
// @ts-expect-error Empty responsive objects do not define a recipe.
const emptySize: EmptyStateRootProps = { size: {} };
// @ts-expect-error Responsive alignment stays logical.
const physicalAlign: EmptyStateRootProps = { align: { md: "left" } };
// @ts-expect-error Unknown responsive sizes are rejected.
const invalidSize: EmptyStateRootProps = { size: { sm: "xl" } };
void [responsive, emptySize, physicalAlign, invalidSize];
// @ts-expect-error Native color is not the Theme customization API.
const nativeColor: EmptyStateRootProps = { color: "red" };
void nativeColor;
