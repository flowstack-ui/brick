import { DataList, VStack, Text } from "@flowstack-ui/brick";
export function DataListResponsive() {
  return (
    <VStack gap={8}>
      <VStack gap={3}>
        <Text variant="body-sm">Stack on small screens</Text>
        <DataList.Root
          orientation={{ initial: "vertical", md: "horizontal" }}
          size={{ initial: "sm", md: "md" }}
          variant={{ initial: "subtle", lg: "bold" }}
        >
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
      <VStack gap={3}>
        <Text variant="body-sm">Reverse orientation</Text>
        <DataList.Root
          orientation={{
            initial: "horizontal",
            md: "vertical",
            lg: "horizontal",
            xl: "vertical",
          }}
        >
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
    </VStack>
  );
}
