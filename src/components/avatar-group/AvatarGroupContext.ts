"use client";

import { createContext, useContext } from "react";
import type { AvatarShape, AvatarSize } from "../avatar/Avatar.js";

export interface AvatarGroupPresentation {
  shape: AvatarShape;
  size: AvatarSize;
}

export const AvatarGroupPresentationContext =
  createContext<AvatarGroupPresentation | null>(null);

export function useAvatarGroupPresentation() {
  return useContext(AvatarGroupPresentationContext);
}
