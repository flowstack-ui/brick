import { useId, useState } from "react";
import { ActionDelegate, Button, Card, Checkbox, For, Grid, HStack, Table, Text, VStack, useSelection, useSelectionCheckbox, type SelectionState } from "@flowstack-ui/brick";

const products = [{ id: "keyboard", name: "Studio Keyboard", stock: 12 }, { id: "mouse", name: "Precision Mouse", stock: 8 }, { id: "display", name: "Pro Display", stock: 0 }];
function Product({ product, selection, table, report }: { product: typeof products[number]; selection: SelectionState; table: boolean; report(message: string): void }) {
  const id = useId();
  const binding = useSelectionCheckbox({ selection, value: product.id });
  const checkbox = <Checkbox {...binding} aria-label={`Select ${product.name}`} />;
  const open = <Button variant="ghost" size="sm" id={id} onClick={() => report(`Opened ${product.name}`)}>{product.name}</Button>;
  const action = <Button variant="outline" size="sm" onClick={() => report(`Stock history for ${product.name}`)}>Stock history</Button>;
  return (
    <ActionDelegate targetId={id}>
      {table ? <Table.Row selected={selection.isSelected(product.id)}><Table.Cell>{checkbox}</Table.Cell><Table.Head scope="row">{open}</Table.Head><Table.Cell numeric>{product.stock}</Table.Cell><Table.Cell>{action}</Table.Cell></Table.Row> :
        <Card.Root as="article" selected={selection.isSelected(product.id)}>
          <Card.Header><Card.Title>{open}</Card.Title><Card.Action>{checkbox}</Card.Action></Card.Header>
          <Card.Content>{product.stock} available</Card.Content><Card.Footer>{action}</Card.Footer>
        </Card.Root>}
    </ActionDelegate>
  );
}
export function SelectableInventory() {
  const selection = useSelection({ orderedKeys: products.map(product => product.id), disabledKeys: ["display"] });
  const [table, setTable] = useState(false);
  const [message, report] = useState("No product opened");
  const content = <For each={products}>{product => <Product key={product.id} product={product} selection={selection} table={table} report={report} />}</For>;
  return (
    <VStack gap="4">
      <HStack gap="3"><Button variant="outline" onClick={() => setTable(value => !value)}>Show {table ? "cards" : "table"}</Button><Text role="status">{selection.selectedKeys.length} selected. {message}</Text></HStack>
      {table ? <Table.Container><Table.Root><Table.Caption>Inventory selection</Table.Caption><Table.Header><Table.Row><Table.Head>Select</Table.Head><Table.Head>Product</Table.Head><Table.Head numeric>Stock</Table.Head><Table.Head>Actions</Table.Head></Table.Row></Table.Header><Table.Body>{content}</Table.Body></Table.Root></Table.Container> : <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">{content}</Grid.Root>}
    </VStack>
  );
}
