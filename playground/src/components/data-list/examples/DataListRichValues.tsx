import { DataList, Badge, Link, FormatNumber } from "@flowstack-ui/brick";
export function DataListRichValues() {
  return (
    <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
      <DataList.Item>
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>
          <Badge tone="success" variant="soft">
            Active
          </Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Website</DataList.Label>
        <DataList.Value>
          <Link href="https://example.com">Visit our website</Link>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Balance</DataList.Label>
        <DataList.Value>
          <FormatNumber
            value={12340}
            formatOptions={{ style: "currency", currency: "USD" }}
          />
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
