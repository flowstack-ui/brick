import type { ReactNode } from "react";
import { Button, HStack, Icon, Surface, Tabs, VStack } from "@flowstack-ui/brick";
import { ExampleSource } from "./ExampleSource.js";
import { StackBlitzMark } from "../shell/branding/StackBlitzMark.js";

/** Docs presentation only. Source must come from the rendered demo's raw file. */
export function ExamplePreview({ children, source, label }: {
  children: ReactNode;
  source: string;
  label: string;
}) {
  return (
    <Tabs.Root defaultValue="preview" size="sm" variant="soft" tone="neutral" data-example-preview>
      <VStack gap="4">
        <HStack justify="between" gap="2">
          <Tabs.List ariaLabel={`${label} view`}>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="code">Code</Tabs.Trigger>
          </Tabs.List>
          <Button disabled size="sm" tone="neutral" variant="ghost"
            title="StackBlitz export is not available yet"
            startIcon={<Icon size="xs" tone="inherit"><StackBlitzMark /></Icon>}>
            StackBlitz
          </Button>
        </HStack>
        <Tabs.Content value="preview" inset="none">
          <Surface level="canvas" bordered inset={{ initial: "md", sm: "xl" }} radius="md" data-example-canvas>
            {children}
          </Surface>
        </Tabs.Content>
        <Tabs.Content value="code" inset="none">
          <ExampleSource source={source} label={label} />
        </Tabs.Content>
      </VStack>
    </Tabs.Root>
  );
}
