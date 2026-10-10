import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockHighlight() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
      meta={{ showLineNumbers: true, highlightLines: [2] }}
    >
      <CodeBlock.Content aria-label="Highlight source" />
    </CodeBlock.Root>
  );
}
