import { HoverCard, type HoverCardContentProps, type HoverCardRootProps, type UseHoverCardReturn } from "../../../src/hover-card.js";
void HoverCard;
const content: HoverCardContentProps = { children: "Preview", inset: "xs", radius: "overlay", size: "lg", asChild: true };
const root: HoverCardRootProps = { children: null, triggerValue: "ada", positioning: { placement: "bottom-start", strategy: "fixed", sameWidth: true }, unmountOnExit: false, onPointerDownOutside: event => event.preventDefault() };
// @ts-expect-error Width recipes remain closed.
const badWidth: HoverCardContentProps = { children: null, size: "xs" };
// @ts-expect-error Radius uses shared named tokens, not arbitrary pixels.
const badRadius: HoverCardContentProps = { children: null, radius: "9px" };
// @ts-expect-error Passive preview does not acquire popup naming.
const badLabel: HoverCardContentProps = { children: null, "aria-label": "Preview" };
declare const controller: UseHoverCardReturn;
void [content, root, badWidth, badRadius, badLabel, controller];
