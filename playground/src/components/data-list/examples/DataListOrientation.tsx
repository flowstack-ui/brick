import { DataList, VStack, Text } from "@flowstack-ui/brick";
export function DataListOrientation() {
  return (
    <VStack gap={8}>
      {(["vertical", "horizontal"] as const).map((orientation) => (
        <VStack gap={3} key={orientation}>
          <Text variant="body-sm">{orientation}</Text>
          <DataList.Root orientation={orientation}>
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
