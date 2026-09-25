import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockBounded() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
    >
      <CodeBlock.Content aria-label="Bounded source" maxLines={1} />
    </CodeBlock.Root>
  );
}
