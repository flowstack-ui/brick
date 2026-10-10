import { useCallback, useRef, type ReactNode } from "react";
import {
  For,
  Frame,
  Grid,
  ScrollArea,
  Show,
  TableOfContents,
  VStack,
} from "@flowstack-ui/brick";
import "./docs-table-of-contents.css";
import { DocsEditLink } from "./DocsEditLink.js";

export interface DocsSectionMetadata {
  id: string;
  title: string;
  level: 2 | 3;
}
export function DocsTableOfContents({
  sections,
  children,
  editPageHref,
}: {
  sections: readonly DocsSectionMetadata[];
  children: ReactNode;
  editPageHref?: string;
}) {
  const content = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const getTargetRoot = useCallback(() => content.current, []);
  const getRail = useCallback(() => rail.current, []);
  const items = sections.map(({ id, level }) => ({ id, depth: level }));
  return (
    <TableOfContents.Root
      items={items}
      getTargetRoot={getTargetRoot}
      navigation="managed"
      scrollOffset={88}
    >
      <Grid.Root columns={{ initial: 1, xl: 4 }} gap="14" align="start">
        <Grid.Item columnSpan={{ initial: 1, xl: 3 }} ref={content}>
          {children}
        </Grid.Item>
        <Grid.Item align="stretch" asChild>
          <Show from="xl" as="aside">
            <VStack startSpacing="5" className="docs-table-of-contents-rail">
              <Frame blockSize="calc(100dvh - 7rem)" asChild>
                <ScrollArea.Root>
                  <ScrollArea.Viewport ref={rail}>
                    <TableOfContents.Nav getScrollElement={getRail}>
                      <TableOfContents.Title>
                        On this page
                      </TableOfContents.Title>
                      <TableOfContents.List>
                        <For each={sections}>
                          {(section) => (
                            <TableOfContents.Item
                              key={section.id}
                              value={section.id}
                            >
                              <TableOfContents.Link>
                                {section.title}
                              </TableOfContents.Link>
                            </TableOfContents.Item>
                          )}
                        </For>
                      </TableOfContents.List>
                    </TableOfContents.Nav>
                    {editPageHref && <DocsEditLink href={editPageHref} />}
                  </ScrollArea.Viewport>
                </ScrollArea.Root>
              </Frame>
            </VStack>
          </Show>
        </Grid.Item>
      </Grid.Root>
    </TableOfContents.Root>
  );
}
