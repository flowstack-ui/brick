import { Kbd, type KbdProps, type KbdSize, type KbdVariant } from "../../../src/kbd.js";
const variant: KbdVariant = "outline";
const size: KbdSize = "lg";
const props: KbdProps = { children: "Enter", variant, size };
void Kbd; void props;
// @ts-expect-error Kbd owns passive notation, not shortcuts.
const invalidShortcut: KbdProps = { children: "Enter", onShortcut: () => {} };
// @ts-expect-error Kbd keeps native semantics.
const invalidHost: KbdProps = { children: "Enter", as: "span" };
void invalidShortcut; void invalidHost;
// @ts-expect-error A projected host must be an element, not text.
const invalidChild: KbdProps = { asChild: true, children: "Enter" };
// @ts-expect-error Semantic tones are closed.
const invalidTone: KbdProps = { children: "Enter", tone: "purple" };
void invalidChild; void invalidTone;
