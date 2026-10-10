import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockDiff() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
      meta={{ showLineNumbers: true, removedLines: [1], addedLines: [2] }}
    >
      <CodeBlock.Content aria-label="Diff source" />
    </CodeBlock.Root>
  );
}
