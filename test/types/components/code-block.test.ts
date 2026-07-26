import { CodeBlock, type CodeBlockRootProps, type CodeBlockWrap } from "../../../src/code-block.js";

const wrap: CodeBlockWrap = "scroll";
const root: CodeBlockRootProps = { children: null, value: "const value = 1", language: "ts", variant: "bordered", size: "sm" };
void CodeBlock;
void wrap;
void root;

// @ts-expect-error Root requires the authoritative raw copied value.
const missingValue: CodeBlockRootProps = { children: null, language: "ts" };
// @ts-expect-error highlighting is consumer React output, not unsafe HTML.
const unsafe: CodeBlockRootProps = { children: null, value: "x", dangerouslySetInnerHTML: { __html: "x" } };
void missingValue;
void unsafe;
