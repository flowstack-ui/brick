import { DataList } from "@flowstack-ui/brick";
export function DataListGrouped() {
  return (
    <DataList.Root orientation={{ initial: "vertical", md: "horizontal" }}>
      <DataList.Item>
        <DataList.Label>Author</DataList.Label>
        <DataList.Label>Editor</DataList.Label>
        <DataList.Value>Jordan Lee</DataList.Value>
        <DataList.Value>Sam Rivera</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Contact</DataList.Label>
        <DataList.Value>
          <DataList.Root size="sm">
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>jordan@example.com</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
