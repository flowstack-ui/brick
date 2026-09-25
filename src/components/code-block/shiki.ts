import type { CSSProperties } from "react";
import type { CodeBlockAdapter } from "./CodeBlock.js";
import { renderCodeBlockLines, type CodeBlockToken } from "./lines.js";

/** Structural interface: Shiki remains optional and is never imported by Brick. */
export interface CodeBlockShikiHighlighter {
  // Shiki narrows options to the consumer's loaded-language/theme unions.
  // Runtime calls below use only loaded languages and validated theme names.
  codeToTokens(code: string, options: any): {
    tokens: CodeBlockToken[][];
  };
  getTheme(name: string): { fg: string; bg: string };
  getLoadedLanguages(): string[];
}

export interface CodeBlockShikiOptions {
  /** Load once in application setup. Reuse the returned adapter across blocks. */
  load: () => Promise<CodeBlockShikiHighlighter> | CodeBlockShikiHighlighter;
  themes: { light: string; dark: string };
}

/** Await outside React render (or in a server loader). Loading errors propagate. */
export async function createShikiAdapter({ load, themes }: CodeBlockShikiOptions): Promise<CodeBlockAdapter> {
  const highlighter = await load();
  const palettes = {
    light: highlighter.getTheme(themes.light),
    dark: highlighter.getTheme(themes.dark),
  };
  const adapter: CodeBlockAdapter = ({ value, language = "text", meta, colorScheme = "dark" }) => {
    const known = highlighter.getLoadedLanguages().includes(language);
    if (!known || language === "text" || language === "plaintext") return renderCodeBlockLines(value, meta);
    const { tokens } = highlighter.codeToTokens(value, { lang: language, theme: themes[colorScheme] });
    return renderCodeBlockLines(value, meta, tokens);
  };
  adapter.defaultColorScheme = "dark";
  adapter.getStyle = (scheme) => ({
    "--brick-code-block-background": palettes[scheme].bg,
    "--brick-code-block-foreground": palettes[scheme].fg,
  } as CSSProperties);
  return adapter;
}
