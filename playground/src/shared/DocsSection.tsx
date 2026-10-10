import { Heading, Link, Paragraph, VStack } from "@flowstack-ui/brick";
import type { ReactNode } from "react";

/** Shared document structure; example state remains owned by ExamplePreview. */
export function DocsSection({ id, title, level = 2, description, children }: {
  id: string;
  title: string;
  level?: 2 | 3;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <VStack as="section" id={id} className="evidence-docs-section" gap={description && level === 2 ? 6 : 8}>
      <VStack gap={level === 2 ? 4 : 2}>
      <Heading level={level} id={`${id}-heading`} variant={level === 2 ? "title-md" : "title-sm"}>
        <Link href={`#${id}`} tone="inherit" variant="underline">{title}</Link>
      </Heading>
      {description && <Paragraph variant="body-md" tone="secondary">{description}</Paragraph>}
      </VStack>
      {children}
    </VStack>
  );
}
