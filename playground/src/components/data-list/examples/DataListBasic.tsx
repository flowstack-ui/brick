import { DataList } from "@flowstack-ui/brick";
export function DataListBasic() {
  return (
    <DataList.Root>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>Jordan Lee</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>jordan@example.com</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
