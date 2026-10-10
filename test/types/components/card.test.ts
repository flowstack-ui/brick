import { createElement } from "react";
import {
  Card,
  type CardRootElement,
  type CardRootProps,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "../../../src/card.js";

const rootElement: CardRootElement = "article";
const titleElement: CardTitleElement = "h2";
const size: CardSize = "lg";
const variant: CardVariant = "elevated";
const rootProps: CardRootProps = {
  "aria-labelledby": "project-title",
  as: rootElement,
  children: createElement(Card.Header, null, [
    createElement(
      Card.Title,
      { as: titleElement, id: "project-title", key: "title" },
      "Project",
    ),
    createElement(
      Card.Description,
      { key: "description" },
      "Updated today",
    ),
  ]),
  size,
  variant,
};

void Card;
void rootProps;

// @ts-expect-error Root semantic elements are a closed set.
const invalidRoot: CardRootElement = "button";
// @ts-expect-error Title heading levels are a closed set.
const invalidTitle: CardTitleElement = "div";
// @ts-expect-error Card variants are a closed set.
const invalidVariant: CardVariant = "ghost";
// @ts-expect-error Card sizes are a closed set.
const invalidSize: CardSize = "xl";
// @ts-expect-error Card is a namespace and not a callable flat component.
const invalidFlatCard = createElement(Card, null, "Project");
const composedForm: CardRootProps = { asChild: true, overflow: "visible", children: createElement("form") };
const responsive: CardRootProps = { size: { md: "lg" }, variant: { sm: "subtle", lg: "outline" } };
void responsive;
// @ts-expect-error Empty responsive values cannot establish an inherited recipe.
const emptyResponsive: CardRootProps = { size: {} };
// @ts-expect-error Header composition requires an actual child element.
const emptyHeader = createElement(Card.Header, { asChild: true });
void emptyResponsive; void emptyHeader;
void composedForm;
// @ts-expect-error asChild requires one element.
const invalidComposition: CardRootProps = { asChild: true };
// @ts-expect-error Card deliberately has no semantic tone prop.
const invalidTone: CardRootProps = { tone: "accent" };

void invalidRoot;
void invalidTitle;
void invalidVariant;
void invalidSize;
void invalidFlatCard;
void invalidComposition;
void invalidTone;
