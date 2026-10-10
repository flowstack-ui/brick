"use client";

import { createContext, forwardRef, useContext } from "react";
import { Group, type GroupProps } from "../group/Group.js";
import type { ButtonVisualProps } from "./Button.js";

type ButtonGroupVisualProps = Pick<ButtonVisualProps,
  "size" | "variant" | "tone" | "radius" | "focusRing">;

export type ButtonGroupProps = GroupProps & ButtonGroupVisualProps;

const ButtonGroupContext = createContext<ButtonGroupVisualProps>({});
/** Internal visual defaults only; never shares interaction state. */
export function useButtonGroupDefaults() { return useContext(ButtonGroupContext); }

export const ButtonGroup = forwardRef<HTMLElement, ButtonGroupProps>(function ButtonGroup(
  { size, variant, tone, radius, focusRing, ...props }, ref,
) {
  return (
    <ButtonGroupContext.Provider value={{ size, variant, tone, radius, focusRing }}>
      <Group {...props} ref={ref} />
    </ButtonGroupContext.Provider>
  );
});
ButtonGroup.displayName = "ButtonGroup";
