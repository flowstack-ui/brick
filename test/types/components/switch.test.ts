import { createElement, createRef } from "react";
import {
  Switch,
  SwitchRoot,
  SwitchThumb,
  SwitchField,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  useSwitch,
  type SwitchRootProps,
  type SwitchSize,
  type SwitchTone,
  type SwitchThumbProps,
  type SwitchVariant,
} from "../../../src/switch.js";
import { Switch as RootSwitch } from "../../../src/index.js";

const rootRef = createRef<HTMLButtonElement>();
const thumbRef = createRef<HTMLSpanElement>();
const sizes: SwitchSize[] = ["xs", "sm", "md", "lg"];
const variants: SwitchVariant[] = ["solid", "raised"];
const tones: SwitchTone[] = ["neutral", "accent", "contrast", "info", "success", "warning", "danger"];
const thumb: SwitchThumbProps = { title: "Visual thumb" };
const root: SwitchRootProps = {
  "aria-label": "Reports",
  children: createElement(Switch.Thumb, thumb),
  defaultChecked: true,
  name: "reports",
  readOnly: true,
  size: "lg",
  value: "enabled",
};
createElement(Switch.Root, { ...root, ref: rootRef });
createElement(RootSwitch.Root, root);
createElement(SwitchRoot, root);
createElement(SwitchThumb, { ...thumb, ref: thumbRef });
createElement(SwitchField, { size: { initial: "sm", md: "lg" }, children: [
  createElement(SwitchControl, { key: "control" }),
  createElement(SwitchLabel, { key: "label", children: "Reports" }),
  createElement(SwitchHiddenInput, { key: "input" }),
] });
// @ts-expect-error Switch uses a closed four-size scale
createElement(Switch.Root, { ...root, size: "xl" });
// @ts-expect-error mixed state is not valid switch state
createElement(Switch.Root, { ...root, checked: "indeterminate" });
// @ts-expect-error Switch uses a closed variant scale
createElement(Switch.Root, { ...root, variant: "soft" });
void sizes;
void variants;
void tones;
void useSwitch;
