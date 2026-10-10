import { useId, useRef, useState } from "react";
import {
  ActionBar,
  ActionDelegate,
  Button,
  Checkbox,
  CloseButton,
  DropdownMenu,
  For,
  FormatNumber,
  HStack,
  Input,
  Pagination,
  Table,
  Text,
  VStack,
  useSelection,
  useSelectionCheckbox,
  type SelectionState,
} from "@flowstack-ui/brick";

const initialRecords = [
  { id: "inv-1042", name: "Acme Studio", amount: 120, locked: false },
  { id: "inv-1043", name: "Birch Design", amount: 84, locked: false },
  { id: "inv-1044", name: "Cedar Labs", amount: 240, locked: true },
  { id: "inv-1045", name: "Delta Works", amount: 96, locked: false },
];
type Record = (typeof initialRecords)[number];
function Transaction({
  record,
  selection,
  showAmount,
  selectOnClick,
  report,
}: {
  record: Record;
  selection: SelectionState;
  showAmount: boolean;
  selectOnClick: boolean;
  report(message: string): void;
}) {
  const prefix = useId();
  const binding = useSelectionCheckbox({
    selection,
    value: record.id,
    rangeSelection: true,
  });
  return (
    <ActionDelegate targetId={`${prefix}-${selectOnClick ? "select" : "open"}`}>
      <Table.Row selected={selection.isSelected(record.id)}>
        <Table.Cell>
          <Checkbox
            {...binding}
            id={`${prefix}-select`}
            aria-label={`Select ${record.name}`}
          />
        </Table.Cell>
        <Table.Head scope="row">
          <Button
            id={`${prefix}-open`}
            variant="ghost"
            size="sm"
            onClick={() => report(`Opened ${record.name}`)}
          >
            {record.name}
          </Button>
        </Table.Head>
        <Table.Cell>{record.id}</Table.Cell>
        {showAmount && (
          <Table.Cell numeric>
            <FormatNumber
              value={record.amount}
              formatOptions={{ style: "currency", currency: "USD" }}
            />
          </Table.Cell>
        )}
        <Table.Cell>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Actions for ${record.name}`}
              >
                Actions
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  value="receipt"
                  onSelect={() => report(`Receipt preview for ${record.name}`)}
                >
                  Preview receipt
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row>
    </ActionDelegate>
  );
}
export function RecordTransactions() {
  const filterRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState(initialRecords);
  const [query, setQuery] = useState("");
  const [descending, setDescending] = useState(false);
  const [showAmount, setShowAmount] = useState(true);
  const [selectOnClick, setSelectOnClick] = useState(false);
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [actionsDismissed, setActionsDismissed] = useState(false);
  const [message, report] = useState("No record opened");
  const sorted = records
    .filter((record) => record.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      descending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
    );
  const visible = sorted.slice(page * 2, page * 2 + 2);
  const ids = visible.map((record) => record.id);
  const selection = useSelection({
    orderedKeys: ids,
    disabledKeys: records
      .filter((record) => record.locked)
      .map((record) => record.id),
  });
  const scope = selection.getScopeState(ids);
  return (
    <VStack gap="4">
      <Input
        ref={filterRef}
        aria-label="Filter transactions"
        placeholder="Filter customers"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(0);
        }}
      />
      <HStack wrap="wrap" gap="3">
        <Button
          variant="outline"
          onClick={() => setDescending((value) => !value)}
        >
          Sort {descending ? "ascending" : "descending"}
        </Button>
        <Checkbox
          checked={showAmount}
          onCheckedChange={(value) => setShowAmount(value === true)}
        >
          Show amount
        </Checkbox>
        <Checkbox
          checked={selectOnClick}
          onCheckedChange={(value) => setSelectOnClick(value === true)}
        >
          Background click selects
        </Checkbox>
      </HStack>
      <Text role="status">
        {selection.selectedKeys.length} selected. {message}
      </Text>
      <Table.Container>
        <Table.Root striped>
          <Table.Caption>Transaction selection</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>
                <Checkbox
                  aria-label="Select this page"
                  disabled={!visible.some((record) => !record.locked)}
                  checked={
                    scope === "all"
                      ? true
                      : scope === "some"
                        ? "indeterminate"
                        : false
                  }
                  onCheckedChange={(value) =>
                    selection.setScopeSelected(ids, value === true)
                  }
                />
              </Table.Head>
              <Table.Head
                sortDirection={descending ? "descending" : "ascending"}
              >
                Customer
              </Table.Head>
              <Table.Head>Invoice</Table.Head>
              {showAmount && <Table.Head numeric>Amount</Table.Head>}
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={visible}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={showAmount ? 5 : 4}>
                    No matching transactions
                  </Table.Cell>
                </Table.Row>
              }
            >
              {(record) => (
                <Transaction
                  key={record.id}
                  record={record}
                  selection={selection}
                  showAmount={showAmount}
                  selectOnClick={selectOnClick}
                  report={report}
                />
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Table.Container>
      <Pagination.Root
        aria-label="Transaction pages"
        totalPages={Math.max(1, Math.ceil(sorted.length / 2))}
        page={page + 1}
        onPageChange={(value) => setPage(value - 1)}
        size="sm"
      >
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.List>
      </Pagination.Root>
      <Button
        variant="outline"
        disabled={!selection.selectedKeys.length}
        onClick={() => setActionsDismissed(false)}
      >
        Show selected actions
      </Button>
      <ActionBar.Root
        open={selection.selectedKeys.length > 0 && !actionsDismissed}
        closeOnInteractOutside={false}
        onOpenChange={(open) => {
          setActionsDismissed(!open);
          if (!open) setConfirm(false);
        }}
      >
        <ActionBar.Portal>
          <ActionBar.Positioner>
            <ActionBar.Content
              aria-label="Selected transaction actions"
              finalFocus={filterRef}
            >
              <Text>
                <FormatNumber value={selection.selectedKeys.length} /> selected
              </Text>
              <ActionBar.Separator />
              {confirm ? (
                <>
                  <Text>Remove selected demo records?</Text>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirm(false)}
                  >
                    Cancel removal
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      filterRef.current?.focus();
                      setRecords(
                        records.filter(
                          (record) => !selection.isSelected(record.id),
                        ),
                      );
                      selection.clearSelection();
                      setPage(0);
                      setConfirm(false);
                      report("Demo records removed");
                    }}
                  >
                    Confirm removal
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirm(true)}
                  >
                    Remove selected from demo
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      filterRef.current?.focus();
                      selection.clearSelection();
                    }}
                  >
                    Clear selection
                  </Button>
                </>
              )}
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" aria-label="Dismiss selected actions" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </ActionBar.Portal>
      </ActionBar.Root>
    </VStack>
  );
}
