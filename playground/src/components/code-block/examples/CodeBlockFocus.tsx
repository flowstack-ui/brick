import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockFocus() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
      meta={{ focusedLines: [2], dimUnfocused: true }}
    >
      <CodeBlock.Content aria-label="Focus source" />
    </CodeBlock.Root>
  );
}
