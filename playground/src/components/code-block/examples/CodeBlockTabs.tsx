import { CodeBlock, Tabs } from "@flowstack-ui/brick";
export function CodeBlockTabs() {
  return (
    <Tabs.Root defaultValue="js">
      <Tabs.List ariaLabel="Code language">
        <Tabs.Trigger value="js">JavaScript</Tabs.Trigger>
        <Tabs.Trigger value="py">Python</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="js">
        <CodeBlock.Root value={'console.log("Hello");'}>
          <CodeBlock.Content aria-label="JavaScript source" />
        </CodeBlock.Root>
      </Tabs.Content>
      <Tabs.Content value="py">
        <CodeBlock.Root value={'print("Hello")'}>
          <CodeBlock.Content aria-label="Python source" />
        </CodeBlock.Root>
      </Tabs.Content>
    </Tabs.Root>
  );
}
