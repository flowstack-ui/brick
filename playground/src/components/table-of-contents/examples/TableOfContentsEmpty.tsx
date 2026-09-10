import {
  For,
  TableOfContents,
  Text,
  type TableOfContentsItemData,
} from "@flowstack-ui/brick";
const items: readonly TableOfContentsItemData[] = [];
export function TableOfContentsEmpty() {
  return (
    <TableOfContents.Root items={items}>
      <TableOfContents.Nav aria-label="Document contents">
        {items.length ? (
          <TableOfContents.List>
            <For each={items}>
              {(item) => (
                <TableOfContents.Item key={item.id} value={item.id}>
                  <TableOfContents.Link>{item.id}</TableOfContents.Link>
                </TableOfContents.Item>
              )}
            </For>
          </TableOfContents.List>
        ) : (
          <Text tone="secondary">No sections yet.</Text>
        )}
      </TableOfContents.Nav>
    </TableOfContents.Root>
  );
}
