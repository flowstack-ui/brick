import { Breadcrumb, VStack } from "@flowstack-ui/brick";

export function BreadcrumbDirection() {
  return (
    <VStack gap={6} dir="rtl">
      <Breadcrumb.Root aria-label="مسار الصفحة">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#docs">الرئيسية</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#components">المكتبة</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>المكونات</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Breadcrumb.Root dir="ltr" aria-label="English path">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#components">Components</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </VStack>
  );
}
