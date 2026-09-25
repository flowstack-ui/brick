import { Code, For, Paragraph, ScrollArea, Surface, Table, Text, VStack } from "@flowstack-ui/brick";
import type { ReactNode } from "react";

export interface DocsPropDefinition<Props> {
  name: Extract<keyof Props, string>;
  defaultLabel?: string;
  typeLabel: string;
  description: ReactNode;
}

/** Documentation composition, not a public Brick component or API generator. */
export function PropsTable<Props>({ label, rows }: {
  label: string;
  rows: readonly DocsPropDefinition<Props>[];
}) {
  return <ScrollArea.Root orientation="horizontal">
    <ScrollArea.Viewport focusable aria-label={`${label} scroll area`}>
      <Table.Root aria-label={label} variant="outline" layout="fixed">
        <Table.ColumnGroup>
          <Table.Column htmlWidth="20%" />
          <Table.Column htmlWidth="15%" />
          <Table.Column htmlWidth="65%" />
        </Table.ColumnGroup>
        <Surface asChild level="subtle" radius="none">
          <Table.Header><Table.Row>
            <Table.Head>Prop</Table.Head>
            <Table.Head>Default</Table.Head>
            <Table.Head>Type</Table.Head>
          </Table.Row></Table.Header>
        </Surface>
        <Table.Body>
          <For each={rows}>{row => <Table.Row key={row.name}>
            <Table.Head scope="row" verticalAlign="top"><Code>{row.name}</Code></Table.Head>
            <Table.Cell verticalAlign="top">
              {row.defaultLabel === undefined ? <Text tone="secondary">—</Text> : <Code>{row.defaultLabel}</Code>}
            </Table.Cell>
            <Table.Cell verticalAlign="top">
              <VStack align="start" gap={3}>
                <Code>{row.typeLabel}</Code>
                <Paragraph variant="body-md">{row.description}</Paragraph>
              </VStack>
            </Table.Cell>
          </Table.Row>}</For>
        </Table.Body>
      </Table.Root>
    </ScrollArea.Viewport>
  </ScrollArea.Root>;
}
