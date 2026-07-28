import { Toolbar, type ToolbarRootProps, type ToolbarSize, type ToolbarVariant } from "../../../src/toolbar.js";
const variant: ToolbarVariant = "outline"; const size: ToolbarSize = "lg";
const props: ToolbarRootProps = { ariaLabel: "Editor", size, variant };
void Toolbar; void props;
// @ts-expect-error Toolbar variants are closed.
const badVariant: ToolbarVariant = "ghost";
void badVariant;
