import type { ButtonProps } from "../../../src/button.js";
import type { IconButtonProps } from "../../../src/icon-button.js";
import type { ToggleProps } from "../../../src/toggle.js";
import type { Radius } from "../../../src/radius.js";
const core: Radius = "2xs";
const role: Radius = "control";
const button: ButtonProps = {radius:core};
const toggle: ToggleProps = {radius:role};
const icon: IconButtonProps = {radius:"none",children:"X","aria-label":"Close"};
// @ts-expect-error Radius and legacy shape are mutually exclusive.
const mixed: ButtonProps = {radius:"sm",shape:"pill"};
// @ts-expect-error Radius does not accept arbitrary dimensions.
const arbitrary: Radius = "8px";
void [button,toggle,icon,mixed,arbitrary];
