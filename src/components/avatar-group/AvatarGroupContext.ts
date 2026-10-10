"use client";

import { createContext, useContext } from "react";
import type { AvatarShape, AvatarSize, AvatarVariant, AvatarTone } from "../avatar/Avatar.js";
import type { Radius } from "../_radius/Radius.js";

export interface AvatarGroupPresentation {
  radius?: Radius;
  shape: AvatarShape;
  size: AvatarSize;
  variant?: AvatarVariant;
  tone?: AvatarTone;
  borderless?: boolean;
}

export const AvatarGroupPresentationContext =
  createContext<AvatarGroupPresentation | null>(null);

export function useAvatarGroupPresentation() {
  return useContext(AvatarGroupPresentationContext);
}
