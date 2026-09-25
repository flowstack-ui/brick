import { Fragment, type CSSProperties, type ReactNode } from "react";
import { CodeBlockLine } from "./CodeBlock.js";

/** All line numbers are one-based. Invalid or out-of-range values have no effect. */
export interface CodeBlockMeta {
  showLineNumbers?: boolean;
  highlightLines?: readonly number[];
  focusedLines?: readonly number[];
  addedLines?: readonly number[];
  removedLines?: readonly number[];
  dimUnfocused?: boolean;
}

export interface CodeBlockToken {
  content: string;
  color?: string;
  fontStyle?: number;
}

/** Pure presentation conversion. The original line separators are retained. */
export function renderCodeBlockLines(value: string, meta: CodeBlockMeta = {}, tokens?: readonly (readonly CodeBlockToken[])[]): ReactNode {
  const parts = value.split(/(\r\n|\n|\r)/);
  const sourceLines = parts.filter((_, index) => index % 2 === 0);
  // A tokenizer must never silently change the source shown to the user.
  const validTokens = tokens?.length === sourceLines.length && tokens.every((line, index) => line.map(token => token.content).join("") === sourceLines[index]);
  const highlighted = new Set(meta.highlightLines);
  const focused = new Set(meta.focusedLines);
  const added = new Set(meta.addedLines);
  const removed = new Set(meta.removedLines);
  return sourceLines.map((line, index) => {
    const number = index + 1;
    return <CodeBlockLine key={index} lineNumber={meta.showLineNumbers ? number : undefined}
      highlighted={highlighted.has(number)} focused={focused.has(number)}
      change={added.has(number) ? "added" : removed.has(number) ? "removed" : undefined}>
      {validTokens ? tokens[index].map((token, tokenIndex) => <span key={tokenIndex} className="brick-code-block-token" style={{
        color: token.color,
        fontStyle: (token.fontStyle ?? 0) & 1 ? "italic" : undefined,
        fontWeight: (token.fontStyle ?? 0) & 2 ? "bold" : undefined,
        textDecoration: (token.fontStyle ?? 0) & 4 ? "underline" : undefined,
      } as CSSProperties}>{token.content}</span>) : line}
      <Fragment>{parts[index * 2 + 1] ? <span className="brick-code-block-line-ending">{parts[index * 2 + 1]}</span> : null}</Fragment>
    </CodeBlockLine>;
  });
}
