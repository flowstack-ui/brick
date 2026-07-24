import { createElement, createRef } from "react";
import {
  Avatar,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "../../../src/avatar.js";

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: AvatarShape[] = ["circle", "rounded"];
const statuses: AvatarStatus[] = ["online", "away", "busy", "offline"];
const informative: AvatarProps = {
  "aria-describedby": "avatar-help",
  alt: "Ada Lovelace",
  className: "consumer-avatar",
  fallback: createElement("strong", null, "AL"),
  fallbackDelayMs: 150,
  onLoadingStatusChange: (status) => void status,
  shape: "rounded",
  size: "xl",
  src: "/ada.png",
  status: "online",
  style: { marginInlineStart: 4 },
  title: "Collaborator",
};
const decorative: AvatarProps = {
  alt: "",
  fallback: "AL",
};

createElement(Avatar, informative);
createElement(Avatar, decorative);
createElement(Avatar, {
  alt: "Ada",
  fallback: "AL",
  ref: createRef<HTMLSpanElement>(),
});
void sizes;
void shapes;
void statuses;

// @ts-expect-error alt is required.
const invalidMissingAlt: AvatarProps = { fallback: "AL" };
// @ts-expect-error fallback is required.
const invalidMissingFallback: AvatarProps = { alt: "Ada Lovelace" };
// @ts-expect-error Sizes are closed.
const invalidSize: AvatarSize = "2xl";
// @ts-expect-error Shapes are closed.
const invalidShape: AvatarShape = "square";
// @ts-expect-error Statuses are closed.
const invalidStatus: AvatarStatus = "idle";
const invalidChildren: AvatarProps = {
  alt: "Ada",
  // @ts-expect-error Avatar owns its children internally.
  children: "Unexpected",
  fallback: "AL",
};
const invalidColor: AvatarProps = {
  alt: "Ada",
  // @ts-expect-error Native color is excluded.
  color: "red",
  fallback: "AL",
};
const invalidAsChild: AvatarProps = {
  alt: "Ada",
  // @ts-expect-error Avatar does not expose asChild.
  asChild: true,
  fallback: "AL",
};
// @ts-expect-error Avatar does not generate initials from a name.
const invalidName: AvatarProps = { alt: "Ada", fallback: "AL", name: "Ada" };

void invalidMissingAlt;
void invalidMissingFallback;
void invalidSize;
void invalidShape;
void invalidStatus;
void invalidChildren;
void invalidColor;
void invalidAsChild;
void invalidName;
