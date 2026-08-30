import {
  CodeBlock,
  type CodeBlockAdapter,
  type CodeBlockContentProps,
  type CodeBlockLineChange,
  type CodeBlockLineProps,
  type CodeBlockRootProps,
  type CodeBlockWrap,
} from "../../../src/code-block.js";

const wrap: CodeBlockWrap = "scroll";
const root: CodeBlockRootProps = { children: null, value: "const value = 1", language: "ts", variant: "bordered", size: "sm" };
const adapter: CodeBlockAdapter = ({ value, language }) => `${language}: ${value}`;
const change: CodeBlockLineChange = "added";
void CodeBlock;
void adapter;
void change;
void wrap;
void root;

// @ts-expect-error Root requires the authoritative raw copied value.
const missingValue: CodeBlockRootProps = { children: null, language: "ts" };
// @ts-expect-error highlighting is consumer React output, not unsafe HTML.
const unsafe: CodeBlockRootProps = { children: null, value: "x", dangerouslySetInnerHTML: { __html: "x" } };
// @ts-expect-error Content renders the canonical pre/code children and never injected HTML.
const unsafeContent: CodeBlockContentProps = { dangerouslySetInnerHTML: { __html: "x" } };
// @ts-expect-error Line renders trusted React children and never injected HTML.
const unsafeLine: CodeBlockLineProps = { dangerouslySetInnerHTML: { __html: "x" } };
void missingValue;
void unsafe;
void unsafeContent;
void unsafeLine;
