import { Code, type CodeProps, type CodeSize, type CodeTone, type CodeVariant } from "../../../src/code.js";

const variant: CodeVariant = "subtle";
const tone: CodeTone = "inherit";
const size: CodeSize = "md";
const props: CodeProps = { children: "token", variant, tone, size };
void Code;
void props;

// @ts-expect-error Code does not support block mode.
const invalidBlock: CodeProps = { children: "token", block: true };
// @ts-expect-error Code keeps native code semantics.
const invalidHost: CodeProps = { children: "token", as: "span" };
void invalidBlock;
void invalidHost;
