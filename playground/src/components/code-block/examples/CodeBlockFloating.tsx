import type { CSSProperties } from "react";
import {
  CodeBlock,
  IconButton,
  VisuallyHidden,
  ZStack,
} from "@flowstack-ui/brick";
import { Check, Copy } from "lucide-react";
export function CodeBlockFloating() {
  return (
    <CodeBlock.Root value={"const answer = 42;"}>
      <ZStack.Root>
        <ZStack.Item>
          <CodeBlock.Content
            aria-label="Floating action source"
            style={
              {
                "--brick-code-block-content-padding": "1rem 3rem 1rem 1rem",
              } as CSSProperties
            }
          />
        </ZStack.Item>
        <ZStack.Item align="start" justify="end" layer="action" edgeSpacing="2">
          <CodeBlock.CopyTrigger asChild>
            <IconButton
              aria-label="Copy floating source"
              variant="ghost"
              size="xs"
              tone="neutral"
            >
              <CodeBlock.CopyIndicator when="idle">
                <Copy />
              </CodeBlock.CopyIndicator>
              <CodeBlock.CopyIndicator when="copying">
                <Copy />
              </CodeBlock.CopyIndicator>
              <CodeBlock.CopyIndicator when="copied">
                <Check />
              </CodeBlock.CopyIndicator>
              <CodeBlock.CopyIndicator when="error">
                <Copy />
              </CodeBlock.CopyIndicator>
            </IconButton>
          </CodeBlock.CopyTrigger>
        </ZStack.Item>
      </ZStack.Root>
      <VisuallyHidden.Root>
        <CodeBlock.CopyStatus>
          <CodeBlock.CopyIndicator when="copied">
            Copied
          </CodeBlock.CopyIndicator>
          <CodeBlock.CopyIndicator when="error">
            Copy failed. Try again.
          </CodeBlock.CopyIndicator>
        </CodeBlock.CopyStatus>
      </VisuallyHidden.Root>
    </CodeBlock.Root>
  );
}
