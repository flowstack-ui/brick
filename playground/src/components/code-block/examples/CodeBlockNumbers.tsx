import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockNumbers() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
      meta={{ showLineNumbers: true }}
    >
      <CodeBlock.Content aria-label="Numbers source" />
    </CodeBlock.Root>
  );
}
