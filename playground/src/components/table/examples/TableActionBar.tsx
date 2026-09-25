import {
  Checkbox,
  For,
  FormatNumber,
  Table,
  Text,
  VStack,
  useSelection,
  useSelectionCheckbox,
  type SelectionState,
  ActionBar,
  Button,
} from "@flowstack-ui/brick";
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
function ProductRow({
  product,
  selection,
}: {
  product: (typeof products)[number];
  selection: SelectionState;
}) {
  const binding = useSelectionCheckbox({
    selection,
    value: String(product.id),
  });
  return (
    <Table.Row selected={selection.isSelected(String(product.id))}>
      <Table.Cell>
        <Checkbox {...binding} aria-label={`Select ${product.name}`} />
      </Table.Cell>
      <Table.Cell>{product.name}</Table.Cell>
      <Table.Cell>{product.category}</Table.Cell>
      <Table.Cell numeric>
        <FormatNumber value={product.price} />
      </Table.Cell>
    </Table.Row>
  );
}
export function TableActionBar() {
  const keys = products.map((product) => String(product.id));
  const selection = useSelection({ orderedKeys: keys });
  const scope = selection.getScopeState(keys);
  return (
    <VStack gap={4}>
      <Table.Root aria-label="Selectable products">
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <Checkbox
                aria-label="Select all products"
                checked={
                  scope === "all"
                    ? true
                    : scope === "some"
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={(checked) =>
                  selection.setScopeSelected(keys, checked === true)
                }
              />
            </Table.Head>
            <Table.Head>Product</Table.Head>
            <Table.Head>Category</Table.Head>
            <Table.Head numeric>Price</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={products}>
            {(product) => (
              <ProductRow
                key={product.id}
                product={product}
                selection={selection}
              />
            )}
          </For>
        </Table.Body>
      </Table.Root>
      <ActionBar.Root
        open={selection.selectedKeys.length > 0}
        onOpenChange={(open) => {
          if (!open) selection.setScopeSelected(keys, false);
        }}
        closeOnInteractOutside={false}
      >
        <ActionBar.Portal>
          <ActionBar.Positioner>
            <ActionBar.Content aria-label="Selected product actions">
              <Text>
                <FormatNumber value={selection.selectedKeys.length} /> selected
              </Text>
              <ActionBar.Separator />
              <Button
                size="sm"
                variant="outline"
                onClick={() => selection.setScopeSelected(keys, false)}
              >
                Clear selection
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </ActionBar.Portal>
      </ActionBar.Root>
    </VStack>
  );
}
