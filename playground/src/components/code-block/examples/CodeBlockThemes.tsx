import { CodeBlock, For, VStack } from "@flowstack-ui/brick";
export function CodeBlockThemes() {
  return (
    <VStack gap="4">
      <For each={["light", "dark"] as const}>
        {(colorScheme) => (
          <CodeBlock.Root
            key={colorScheme}
            colorScheme={colorScheme}
            value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
          >
            <CodeBlock.Header>
              <CodeBlock.Title>{colorScheme}</CodeBlock.Title>
            </CodeBlock.Header>
            <CodeBlock.Content aria-label={colorScheme + " source"} />
          </CodeBlock.Root>
        )}
      </For>
    </VStack>
  );
}
