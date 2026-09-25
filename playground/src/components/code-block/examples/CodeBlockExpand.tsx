import { CodeBlock } from "@flowstack-ui/brick";
export function CodeBlockExpand() {
  return (
    <CodeBlock.Collapse>
      <CodeBlock.Root
        value={
          'const greeting = "Hello, world!";\nconsole.log(greeting);\n\nexport { greeting };'
        }
      >
        <CodeBlock.Header>
          <CodeBlock.Title>greeting.ts</CodeBlock.Title>
        </CodeBlock.Header>
        <CodeBlock.CollapsePreview>
          <CodeBlock.Content aria-label="Source preview" maxLines={2} />
        </CodeBlock.CollapsePreview>
        <CodeBlock.CollapseContent>
          <CodeBlock.Content aria-label="Expanded source" />
        </CodeBlock.CollapseContent>
        <CodeBlock.CollapseTrigger
          closedLabel="Expand code"
          openLabel="Collapse code"
        />
      </CodeBlock.Root>
    </CodeBlock.Collapse>
  );
}
