import { DataList, VStack, Text } from "@flowstack-ui/brick";
export function DataListSizes() {
  return (
    <VStack gap={8}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <VStack gap={3} key={size}>
          <Text variant="body-sm">{size}</Text>
          <DataList.Root size={size}>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>Jordan Lee</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>jordan@example.com</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </VStack>
      ))}
    </VStack>
  );
}
