import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockBasic() {
  return (
    <CodeBlock.Root
      value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
    >
      <CodeBlock.Content aria-label="Basic source" />
    </CodeBlock.Root>
  );
}
