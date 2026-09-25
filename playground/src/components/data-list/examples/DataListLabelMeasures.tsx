import type { CSSProperties } from "react";
import { DataList, VStack, Text } from "@flowstack-ui/brick";
export function DataListLabelMeasures() {
  return (
    <VStack gap={8}>
      {(["auto", "sm", "md", "lg"] as const).map((labelWidth) => (
        <VStack gap={3} key={labelWidth}>
          <Text variant="body-sm">{labelWidth}</Text>
          <DataList.Root orientation="horizontal" labelWidth={labelWidth}>
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
      <VStack gap={3}>
        <Text variant="body-sm">Custom measure</Text>
        <DataList.Root
          orientation="horizontal"
          style={{ "--brick-data-list-label-size": "5rem" } as CSSProperties}
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
