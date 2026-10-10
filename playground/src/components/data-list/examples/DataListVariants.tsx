import { DataList, VStack, Text } from "@flowstack-ui/brick";
export function DataListVariants() {
  return (
    <VStack gap={8}>
      {(["subtle", "bold"] as const).map((variant) => (
        <VStack gap={3} key={variant}>
          <Text variant="body-sm">{variant}</Text>
          <DataList.Root variant={variant}>
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
