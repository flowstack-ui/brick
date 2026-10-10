import { createElement, createRef } from "react";
import { InputAddon } from "../../../src/input-addon.js";
createElement(InputAddon, { ref: createRef<HTMLSpanElement>(), size: { sm: "sm" }, variant: { lg: "subtle" } }, "USD");
// @ts-expect-error addon is not a button
createElement(InputAddon, { onValueChange: () => undefined });
