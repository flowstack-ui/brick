import { Check, Copy, TriangleAlert } from "lucide-react";
import { CodeBlock, HStack, IconButton, Stack, Surface, VisuallyHidden, ZStack } from "@flowstack-ui/brick";

/** Clipboard state belongs to CodeBlock; ZStack only positions its action. */
export function ExampleSource({ source, label }: { source: string; label: string }) {
  return (
    <Surface bordered radius="md" data-brick-appearance="dark" data-example-source>
      <CodeBlock.Root value={source} language="tsx" variant="plain" size="sm">
        <ZStack.Root>
          <HStack endSpacing="12">
            <Stack.Item flex={1}>
              <CodeBlock.Content aria-label={`${label} source`} maxLines={24} />
            </Stack.Item>
          </HStack>
          <ZStack.Item align="start" justify="end" edgeSpacing="2" layer="action">
            <CodeBlock.CopyTrigger asChild>
              <IconButton size="sm" aria-label="Copy code">
                <CodeBlock.CopyIndicator when="idle"><Copy /></CodeBlock.CopyIndicator>
                <CodeBlock.CopyIndicator when="copying"><Copy /></CodeBlock.CopyIndicator>
                <CodeBlock.CopyIndicator when="copied"><Check /></CodeBlock.CopyIndicator>
                <CodeBlock.CopyIndicator when="error"><TriangleAlert /></CodeBlock.CopyIndicator>
              </IconButton>
            </CodeBlock.CopyTrigger>
          </ZStack.Item>
        </ZStack.Root>
        <VisuallyHidden.Root asChild>
          <CodeBlock.CopyStatus>
            <CodeBlock.CopyIndicator when="copying">Copying code…</CodeBlock.CopyIndicator>
            <CodeBlock.CopyIndicator when="copied">Code copied.</CodeBlock.CopyIndicator>
          </CodeBlock.CopyStatus>
        </VisuallyHidden.Root>
        <CodeBlock.CopyStatus>
          <CodeBlock.CopyIndicator when="error">Could not copy. Select the code and copy it manually.</CodeBlock.CopyIndicator>
        </CodeBlock.CopyStatus>
      </CodeBlock.Root>
    </Surface>
  );
}
