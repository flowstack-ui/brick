import { useCallback, useId, useRef, useState } from "react";
import {
  Button,
  Collapsible,
  For,
  Frame,
  Heading,
  HStack,
  Paragraph,
  ScrollArea,
  Stack,
  TableOfContents,
  Text,
  VStack,
  useTableOfContents,
  type TableOfContentsRecipeProps,
} from "@flowstack-ui/brick";

export function TableOfContentsExample({
  size,
  variant,
  tone,
  nested = false,
  indicator = false,
  controlled = false,
  dynamic = false,
  disclosure = false,
  rtl = false,
}: TableOfContentsRecipeProps & {
  nested?: boolean;
  indicator?: boolean;
  controlled?: boolean;
  dynamic?: boolean;
  disclosure?: boolean;
  rtl?: boolean;
}) {
  const prefix = useId();
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [showLast, setShowLast] = useState(true);
  const [activeId, setActiveId] = useState("");
  const getContent = useCallback(() => viewport.current, []);
  const getRail = useCallback(() => rail.current, []);
  const items = [
    { id: `${prefix}-intro`, depth: 2, label: rtl ? "مقدمة" : "Introduction" },
    {
      id: `${prefix}-install`,
      depth: nested ? 3 : 2,
      label: rtl ? "التثبيت والإعداد" : "Installation",
    },
    {
      id: `${prefix}-details`,
      depth: nested ? 3 : 2,
      label: rtl ? "خيارات تخصيص المحتوى" : "Configuration and customization",
    },
    {
      id: `${prefix}-next`,
      depth: 2,
      label: rtl ? "الخطوات التالية" : "Next steps",
    },
  ];
  const api = useTableOfContents({
    items,
    getTargetRoot: getContent,
    getScrollElement: getContent,
    history: "none",
    scrollOffset: 16,
    ...(controlled
      ? { activeId, onActiveIdChange: (id: string) => setActiveId(id) }
      : {}),
  });
  const link = (item: (typeof items)[number]) => (
    <TableOfContents.Item key={item.id} value={item.id}>
      <TableOfContents.Link>{item.label}</TableOfContents.Link>
    </TableOfContents.Item>
  );
  const nav = (
    <TableOfContents.Nav getScrollElement={getRail}>
      <TableOfContents.Title>
        {rtl ? "في هذه الصفحة" : "On this page"}
      </TableOfContents.Title>
      <TableOfContents.List>
        {nested ? (
          <>
            <TableOfContents.Item value={items[0].id}>
              <TableOfContents.Link>{items[0].label}</TableOfContents.Link>
              <TableOfContents.List>
                <For each={items.slice(1, 3)}>{link}</For>
              </TableOfContents.List>
            </TableOfContents.Item>
            {link(items[3])}
          </>
        ) : (
          <For each={items}>{link}</For>
        )}
      </TableOfContents.List>
      {indicator && <TableOfContents.Indicator />}
    </TableOfContents.Nav>
  );
  return (
    <TableOfContents.RootProvider
      value={api}
      size={size}
      variant={variant}
      tone={tone}
    >
      <VStack gap="4" dir={rtl ? "rtl" : undefined}>
        {dynamic && (
          <Button
            variant="outline"
            tone="neutral"
            onClick={() => setShowLast((value) => !value)}
          >
            Toggle final section
          </Button>
        )}
        {controlled && (
          <Text variant="body-sm">
            Current:{" "}
            {items.find((item) => item.id === api.activeId)?.label ?? "None"}
          </Text>
        )}
        <Stack
          direction={{ initial: "column", md: "row" }}
          align="stretch"
          gap="8"
        >
          <Frame inlineSize={{ md: 200 }}>
            {disclosure ? (
              <Collapsible.Root>
                <Collapsible.Trigger>Contents</Collapsible.Trigger>
                <Collapsible.Content>{nav}</Collapsible.Content>
              </Collapsible.Root>
            ) : (
              <Frame blockSize={180} asChild>
                <ScrollArea.Root>
                  <ScrollArea.Viewport ref={rail}>{nav}</ScrollArea.Viewport>
                </ScrollArea.Root>
              </Frame>
            )}
          </Frame>
          <Frame blockSize={280} inlineSize="100%" asChild>
            <ScrollArea.Root>
              <ScrollArea.Viewport
                ref={viewport}
                aria-label="Example article"
                tabIndex={0}
              >
                <VStack gap="8">
                  <For
                    each={items.filter((_, index) => index !== 3 || showLast)}
                  >
                    {(item, index) => (
                      <Frame
                        key={item.id}
                        minBlockSize={index === 3 ? 100 : 320}
                      >
                        <VStack as="section" id={item.id} gap="3">
                          <Heading level={3} variant="title-sm">
                            {item.label}
                          </Heading>
                          <Paragraph tone="secondary">
                            {rtl
                              ? "انتقل بين أقسام هذا الدليل باستخدام الروابط أو التمرير."
                              : "Navigate this guide using the links or scroll the article. The current location follows your reading position."}
                          </Paragraph>
                          {index === 3 && (
                            <HStack>
                              <Button size="sm">Continue reading</Button>
                            </HStack>
                          )}
                        </VStack>
                      </Frame>
                    )}
                  </For>
                </VStack>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Frame>
        </Stack>
      </VStack>
    </TableOfContents.RootProvider>
  );
}
