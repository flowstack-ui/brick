import { Toolbar, type ToolbarRootProps, type ToolbarSize, type ToolbarToggleTone, type ToolbarToggleVariant, type ToolbarVariant } from "../../../src/toolbar.js";
const variant: ToolbarVariant = "outline"; const size: ToolbarSize = "lg";
const props: ToolbarRootProps = { ariaLabel: "Editor", size, variant };
const toggleTone: ToolbarToggleTone = "neutral";
const toggleVariant: ToolbarToggleVariant = "solid";
void Toolbar; void props; void toggleTone; void toggleVariant;
// @ts-expect-error Toolbar variants are closed.
const badVariant: ToolbarVariant = "ghost";
void badVariant;
// @ts-expect-error Toolbar toggle tones are intentionally limited to selection emphasis.
const badToggleTone: ToolbarToggleTone = "danger";
void badToggleTone;
