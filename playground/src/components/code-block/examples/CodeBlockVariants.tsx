import { CodeBlock, For, VStack } from "@flowstack-ui/brick";
export function CodeBlockVariants() {
  return (
    <VStack gap="4">
      <For each={["subtle", "bordered", "plain"] as const}>
        {(variant) => (
          <CodeBlock.Root
            key={variant}
            variant={variant}
            value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
          >
            <CodeBlock.Header>
              <CodeBlock.Title>{variant}</CodeBlock.Title>
            </CodeBlock.Header>
            <CodeBlock.Content aria-label={variant + " source"} />
          </CodeBlock.Root>
        )}
      </For>
    </VStack>
  );
}
