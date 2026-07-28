import { createElement, createRef } from "react";
import {
  Chip,
  ChipLabel,
  ChipRemoveTrigger,
  ChipRoot,
  type ChipLabelProps,
  type ChipRemoveTriggerProps,
  type ChipRootProps,
  type ChipShape,
  type ChipSize,
  type ChipTone,
  type ChipVariant,
} from "../../../src/chip.js";

const variant: ChipVariant = "outline";
const tone: ChipTone = "accent";
const size: ChipSize = "lg";
const shape: ChipShape = "rounded";
const rootProps: ChipRootProps = { variant, tone, size, shape };
const labelProps: ChipLabelProps = { children: "Riley" };
const removeProps: ChipRemoveTriggerProps = {
  ariaLabel: "Remove Riley",
  onPress: () => undefined,
};
const rootRef = createRef<HTMLSpanElement>();
const labelRef = createRef<HTMLSpanElement>();
const removeRef = createRef<HTMLElement>();

void createElement(
  Chip.Root,
  { ...rootProps, ref: rootRef },
  createElement(Chip.Label, { ...labelProps, ref: labelRef }),
  createElement(Chip.RemoveTrigger, { ...removeProps, ref: removeRef }),
);
void ChipRoot;
void ChipLabel;
void ChipRemoveTrigger;

// @ts-expect-error Chip variants are closed.
const badVariant: ChipVariant = "solid";
// @ts-expect-error Chip tones are intentionally not status tones.
const badTone: ChipTone = "danger";
// @ts-expect-error Chip sizes are closed.
const badSize: ChipSize = "xl";
// @ts-expect-error Chip shapes are closed.
const badShape: ChipShape = "circle";
// @ts-expect-error RemoveTrigger requires a localized accessible name.
const unnamedRemove: ChipRemoveTriggerProps = { onPress: () => undefined };
// @ts-expect-error RemoveTrigger cannot navigate.
const linkedRemove: ChipRemoveTriggerProps = { ariaLabel: "Remove", href: "/remove" };
// @ts-expect-error RemoveTrigger is not a loading action.
const loadingRemove: ChipRemoveTriggerProps = { ariaLabel: "Remove", loading: true };

void badVariant;
void badTone;
void badSize;
void badShape;
void unnamedRemove;
void linkedRemove;
void loadingRemove;
