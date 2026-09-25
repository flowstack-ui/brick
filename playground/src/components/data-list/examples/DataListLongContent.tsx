import { DataList } from "@flowstack-ui/brick";
export function DataListLongContent() {
  return (
    <DataList.Root dir="rtl" orientation="horizontal" divide>
      <DataList.Item>
        <DataList.Label>معرّف الحساب</DataList.Label>
        <DataList.Value>
          organization_record_identifier_without_breaks_012345678901234567890123456789
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>تفاصيل المؤسسة الدولية</DataList.Label>
        <DataList.Value>
          معلومات الحساب وعنوان المؤسسة وتفاصيل التواصل
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
