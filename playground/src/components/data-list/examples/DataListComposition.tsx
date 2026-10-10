import { DataList, VStack } from "@flowstack-ui/brick";
import type { ReactNode } from "react";
function Fact({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <DataList.Item>
      <DataList.Label>{label}</DataList.Label>
      <DataList.Value>{value}</DataList.Value>
    </DataList.Item>
  );
}
export function DataListComposition() {
  return (
    <DataList.PropsProvider
      value={{ variant: "bold", orientation: "horizontal", divide: true }}
    >
      <VStack gap={8}>
        <DataList.Root>
          <Fact label="Plan" value="Team" />
          <Fact label="Billing" value="Monthly" />
        </DataList.Root>
        <DataList.Root variant="subtle" divide={false}>
          <Fact label="Renewal" value="October 1" />
        </DataList.Root>
      </VStack>
    </DataList.PropsProvider>
  );
}
