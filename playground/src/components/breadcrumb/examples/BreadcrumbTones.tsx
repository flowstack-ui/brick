import {
  Breadcrumb,
  For,
  VStack,
  Text,
  type BreadcrumbTone,
} from "@flowstack-ui/brick";

export function BreadcrumbTones() {
  const values: BreadcrumbTone[] = ["neutral", "accent", "inherit"];
  return (
    <VStack gap={6}>
      <For each={values}>
        {(value) => (
          <VStack gap={2} key={value}>
            <Text variant="body-sm">{value}</Text>
            <Breadcrumb.Root tone={value} aria-label={`${value} tones path`}>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#components">
                    Components
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
