import { For, TableOfContents } from "@flowstack-ui/brick";

// These IDs belong to real sections on the surrounding documentation page.
const sections = [
  { id: "basic", depth: 2, label: "Usage" },
  { id: "nested", depth: 2, label: "Nested headings" },
  { id: "props", depth: 2, label: "Props" },
];
export function TableOfContentsNative() {
  return (
    <TableOfContents.Root items={sections} navigation="native">
      <TableOfContents.Nav>
        <TableOfContents.Title>Document links</TableOfContents.Title>
        <TableOfContents.List>
          <For each={sections}>
            {(section) => (
              <TableOfContents.Item key={section.id} value={section.id}>
                <TableOfContents.Link>{section.label}</TableOfContents.Link>
              </TableOfContents.Item>
            )}
          </For>
        </TableOfContents.List>
      </TableOfContents.Nav>
    </TableOfContents.Root>
  );
}
