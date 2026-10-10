import { Feed, Text, VStack } from "@flowstack-ui/brick";
export function FeedRtl() {
  return (
    <Feed.Root
      dir="rtl"
      aria-label="نشاط المشروع"
      setSize={1}
      variant="outline"
    >
      <Feed.Item index={0} aria-label="مراجعة التصميم">
        <VStack gap={2}>
          <Text variant="title-sm">مراجعة التصميم</Text>
          <Text variant="body-sm" tone="secondary">
            تمت إضافة تعليق جديد إلى المشروع.
          </Text>
        </VStack>
      </Feed.Item>
    </Feed.Root>
  );
}
