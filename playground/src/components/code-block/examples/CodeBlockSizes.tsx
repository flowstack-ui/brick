import { CodeBlock, For, VStack } from "@flowstack-ui/brick";
export function CodeBlockSizes() {
  return (
    <VStack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <CodeBlock.Root
            key={size}
            size={size}
            value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
          >
            <CodeBlock.Header>
              <CodeBlock.Title>{size}</CodeBlock.Title>
            </CodeBlock.Header>
            <CodeBlock.Content aria-label={size + " source"} />
          </CodeBlock.Root>
        )}
      </For>
    </VStack>
  );
}
