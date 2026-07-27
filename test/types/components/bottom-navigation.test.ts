import { createElement, createRef } from "react";
import {
  BottomNavigation,
  type BottomNavigationIconProps,
  type BottomNavigationItemProps,
  type BottomNavigationLabelProps,
  type BottomNavigationLabelVisibility,
  type BottomNavigationPosition,
  type BottomNavigationRootProps,
} from "../../../src/bottom-navigation.js";

const rootRef = createRef<HTMLElement>();
const itemRef = createRef<HTMLElement>();
const root: BottomNavigationRootProps = {
  ariaLabel: "Primary destinations",
  children: createElement(BottomNavigation.Item, { children: "Home", href: "/home", value: "home" }),
  defaultValue: "home",
  arrangement: "centered",
  blurred: true,
  elevated: true,
  labelVisibility: "active",
  layout: "floating",
  position: "fixed",
  safeArea: true,
  selection: "item",
  selectionShape: "rounded",
  size: "lg",
  tone: "neutral",
  variant: "soft",
};
const item: BottomNavigationItemProps = {
  asChild: true,
  children: createElement("a", { href: "/router" }, "Router"),
  value: "router",
};
const icon: BottomNavigationIconProps = { children: createElement("svg"), "data-slot": "icon" };
const label: BottomNavigationLabelProps = { children: "Home", render: createElement("strong") };
const labelVisibility: BottomNavigationLabelVisibility = "active";
const position: BottomNavigationPosition = "fixed";
void BottomNavigation;
void root;
void item;
void icon;
void label;
void labelVisibility;
void position;
createElement(BottomNavigation.Root, { ...root, ref: rootRef });
createElement(BottomNavigation.Item, { ...item, ref: itemRef });

// @ts-expect-error unsupported size
const invalidSize: BottomNavigationRootProps = { children: null, size: "xl" };
// @ts-expect-error a circular whole-item selection is intentionally invalid
const invalidItemCircle: BottomNavigationRootProps = { children: null, selection: "item", selectionShape: "circle" };
// @ts-expect-error safeArea belongs only to Root
const invalidItemSafeArea: BottomNavigationItemProps = { children: "Home", safeArea: true, value: "home" };
// @ts-expect-error every Item needs explicit destination identity
const missingValue: BottomNavigationItemProps = { children: "Home" };
void invalidSize;
void invalidItemCircle;
void invalidItemSafeArea;
void missingValue;
