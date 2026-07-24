import { createElement } from "react";
import {
  Drawer,
  type DrawerContentProps,
  type DrawerPlacement,
  type DrawerRootProps,
  type DrawerSize,
  type DrawerTitleProps,
} from "../../../src/drawer.js";

const placement: DrawerPlacement = "start";
const size: DrawerSize = "full";
const rootProps: DrawerRootProps = {
  children: createElement(Drawer.Trigger, null, "Open filters"),
  closeOnBackdropClick: false,
  closeOnEscape: false,
  defaultOpen: true,
};
const contentProps: DrawerContentProps = {
  "aria-label": "Project filters",
  children: "Filter controls",
  initialFocus: false,
  placement,
  size,
};
const titleProps: DrawerTitleProps = {
  as: "h1",
  children: "Project filters",
};

void Drawer;
void rootProps;
void contentProps;
void titleProps;

// @ts-expect-error Drawer placements are logical and closed.
const invalidPlacement: DrawerPlacement = "left";
// @ts-expect-error Drawer sizes are a closed set.
const invalidSize: DrawerSize = "xl";
// @ts-expect-error Drawer is a namespace and not a flat callable component.
const invalidFlatDrawer = createElement(Drawer, null, "Filters");
// @ts-expect-error Drawer has no semantic tone prop.
const invalidTone: DrawerContentProps = { tone: "accent" };
// @ts-expect-error Drawer has no arbitrary width prop.
const invalidWidth: DrawerContentProps = { width: 480 };
// @ts-expect-error Gesture behavior is outside the Drawer contract.
const invalidSwipe: DrawerContentProps = { swipeToClose: true };
// @ts-expect-error Snap points require a separate gesture product.
const invalidSnapPoints: DrawerContentProps = { snapPoints: [0.5, 1] };
// @ts-expect-error Drawer Title accepts heading elements only.
const invalidTitle: DrawerTitleProps = { as: "div", children: "Filters" };

void invalidPlacement;
void invalidSize;
void invalidFlatDrawer;
void invalidTone;
void invalidWidth;
void invalidSwipe;
void invalidSnapPoints;
void invalidTitle;
