import { DataList } from "@flowstack-ui/brick";
export function DataListSeparator() {
  return (
    <DataList.Root divide orientation="horizontal">
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>Jordan Lee</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>jordan@example.com</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Address</DataList.Label>
        <DataList.Value>
          48 Orchard Street
          <br />
          Brooklyn, New York
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
