import { createElement } from "react";
import {
  Button,
  type ButtonProps,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "@flowstack-ui/brick";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import {
  Card,
  type CardRootProps,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "@flowstack-ui/brick";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Dialog, type DialogSize } from "@flowstack-ui/brick";
import {
  Dialog as SubpathDialog,
  DialogContent,
  type DialogContentProps,
} from "@flowstack-ui/brick/dialog";

const variant: ButtonVariant = "soft";
const tone: ButtonTone = "success";
const size: ButtonSize = "xl";
const shape: ButtonShape = "pill";
const props: ButtonProps = {
  children: "Save",
  endIcon: createElement("svg"),
  fullWidth: true,
  shape,
  size,
  tone,
  variant,
};
const composed: ButtonProps = {
  asChild: true,
  children: createElement("a", { href: "/account" }, "Account"),
};
const rendered: ButtonProps = {
  children: "Router",
  render: createElement("a", { href: "/router" }),
};

void Button;
void SubpathButton;
void props;
void composed;
void rendered;

const cardVariant: CardVariant = "elevated";
const cardSize: CardSize = "lg";
const cardTitleElement: CardTitleElement = "h1";
const cardProps: CardRootProps = {
  as: "article",
  children: createElement(Card.Content, null, "Report"),
  size: cardSize,
  variant: cardVariant,
};

void Card;
void SubpathCard;
void cardTitleElement;
void cardProps;

const dialogSize: DialogSize = "lg";
const dialogContentProps: DialogContentProps = {
  "aria-label": "Settings",
  children: createElement(Dialog.Body, null, "Settings form"),
  size: dialogSize,
};
void Dialog;
void SubpathDialog;
void DialogContent;
void dialogContentProps;

// @ts-expect-error Brick exposes semantic tone instead of the native color attribute.
const nativeColor: ButtonProps = { children: "Invalid", color: "red" };
// @ts-expect-error asChild owns its content and does not accept icon props.
const composedIcon: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  startIcon: createElement("svg"),
};
// @ts-expect-error asChild and render are mutually exclusive.
const doubleComposition: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  render: createElement("button"),
};
// @ts-expect-error Button variants are a closed recipe set.
const invalidVariant: ButtonProps = { children: "Invalid", variant: "link" };

// @ts-expect-error Card variants are a closed recipe set.
const invalidCardVariant: CardRootProps = { children: "Invalid", variant: "ghost" };
// @ts-expect-error Card Root exposes only approved semantic containers.
const invalidCardElement: CardRootProps = { as: "main", children: "Invalid" };
// @ts-expect-error Card is a namespace and not a callable flat component.
const invalidFlatCard = createElement(Card, null, "Invalid");
// @ts-expect-error Card Title exposes heading elements only.
const invalidCardTitle = createElement(Card.Title, { as: "div" }, "Invalid");
// @ts-expect-error Dialog sizes are a closed recipe set.
const invalidDialogSize: DialogContentProps = { "aria-label": "Invalid", size: "full" };
// @ts-expect-error Dialog is a namespace and not a callable flat component.
const invalidFlatDialog = createElement(Dialog, { title: "Invalid" });

void nativeColor;
void composedIcon;
void doubleComposition;
void invalidVariant;
void invalidCardVariant;
void invalidCardElement;
void invalidFlatCard;
void invalidCardTitle;
void invalidDialogSize;
void invalidFlatDialog;
