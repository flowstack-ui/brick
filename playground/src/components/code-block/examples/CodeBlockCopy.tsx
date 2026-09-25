import { CodeBlock, IconButton, VisuallyHidden } from "@flowstack-ui/brick";
import { Check, Copy } from "lucide-react";
export function CodeBlockCopy() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
    >
      <CodeBlock.Header>
        <CodeBlock.Title>greeting.ts</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyTrigger asChild>
            <IconButton
              aria-label="Copy source"
              variant="ghost"
              tone="neutral"
              size="sm"
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
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content aria-label="Greeting source" />
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
