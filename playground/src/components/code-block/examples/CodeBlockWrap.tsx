import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockWrap() {
  return (
    <CodeBlock.Root
      value={
        'const message = "This long source line wraps to fit the available space without adding a horizontal scrollbar or changing the original text copied to your clipboard.";\nconsole.log(message);'
      }
      meta={{ showLineNumbers: true }}
    >
      <CodeBlock.Content aria-label="Wrap source" wrap="wrap" />
    </CodeBlock.Root>
  );
}
