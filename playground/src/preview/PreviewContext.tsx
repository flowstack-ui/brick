import { createContext, useContext } from "react";
import type { PreviewComponent } from "./preview-registry.js";

export const PreviewContext = createContext<
  { mode: "preview"; component: PreviewComponent; scenario: string } | null
>(null);
export const usePreviewContext = () => useContext(PreviewContext);
