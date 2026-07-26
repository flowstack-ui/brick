import { createContext, useContext } from "react";
import type { CodeBlockSize, CodeBlockVariant } from "./CodeBlock.js";

export interface CodeBlockContextValue {
  value: string;
  language?: string;
  size: CodeBlockSize;
  variant: CodeBlockVariant;
}

export const CodeBlockContext = createContext<CodeBlockContextValue | null>(null);
CodeBlockContext.displayName = "CodeBlockContext";

export function useCodeBlockContext() {
  const context = useContext(CodeBlockContext);
  if (!context) throw new Error("CodeBlock parts must be used within <CodeBlock.Root>");
  return context;
}
